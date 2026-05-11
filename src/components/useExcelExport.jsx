import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useCallback } from "react";
import toast from "react-hot-toast";
import ExpenseLogo from "../assets/images/Logo3.png";
const useExcelExport = () => {
  const handleExport = useCallback(
    async (data, columns, fileName = "Report", filters = {}) => {
      if (!data || data.length === 0) {
        toast("No data to export", {
          icon: "⚠️",
          style: { backgroundColor: "#FFCC00" },
        });
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");

      const response = await fetch(ExpenseLogo);
      const blob = await response.blob();

      const reader = new FileReader();
      const base64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      const imageId = workbook.addImage({
        base64: base64,
        extension: "png",
      });

      worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 },
        ext: { width: 80, height: 50 },
      });

      const lastColumnLetter = worksheet.getColumn(columns.length).letter;

      worksheet.mergeCells(`A2:${lastColumnLetter}2`);
      const titleCell = worksheet.getCell("A2");
      titleCell.value = fileName;
      titleCell.font = { size: 14, bold: true };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };

      let rowIndex = 3;

      const filterEntries = Object.entries(filters);

      for (let i = 0; i < filterEntries.length; i += 2) {
        const left = filterEntries[i];
        const right = filterEntries[i + 1];

        if (left) {
          worksheet.getCell(`A${rowIndex}`).value = `${left[0]} : ${left[1]}`;
          worksheet.getCell(`A${rowIndex}`).font = { bold: true };
          worksheet.getCell(`A${rowIndex}`).alignment = { horizontal: "left" };
        }

        if (right) {
          worksheet.getCell(`${lastColumnLetter}${rowIndex}`).value =
            `${right[0]} : ${right[1]}`;
          worksheet.getCell(`${lastColumnLetter}${rowIndex}`).font = {
            bold: true,
          };
          worksheet.getCell(`${lastColumnLetter}${rowIndex}`).alignment = {
            horizontal: "right",
          };
        }

        rowIndex++;
      }

      worksheet.addRow([]);

      const headerRow = worksheet.addRow(columns.map((col) => col.label));

      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4F81BD" },
        };
        cell.alignment = { horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      const headerRowIndex = headerRow.number;

      data.forEach((row, index) => {
        const rowData = columns.map((col) => {
          if (col.key === "index") return index + 1;

          if (col.type === "number") {
            const value = Number(row[col.key] || 0);
            return Number.isInteger(value)
              ? value
              : value.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                });
          }
          if (col.type === "date") {
            return new Date(row[col.key]).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          }

          return row[col.key] ?? "";
        });

        const dataRow = worksheet.addRow(rowData);

        dataRow.eachCell((cell) => {
          cell.alignment = { horizontal: "center" };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      columns.forEach((_, i) => {
        worksheet.getColumn(i + 1).width = 20;
      });

      worksheet.views = [{ state: "frozen", ySplit: headerRowIndex }];

      const buffer = await workbook.xlsx.writeBuffer();

      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${fileName}.xlsx`,
      );
    },
    [],
  );

  return handleExport;
};

export default useExcelExport;
