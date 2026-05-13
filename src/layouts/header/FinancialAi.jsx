import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  Bot,
  Zap,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import api from "../../api/api";
import { useTheme } from "../../context/ThemeContext";

const FinancialAi = () => {
  const { financialYear } = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const menuRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello 👋 I'm your AI Financial Assistant. Ask me about income, expenses",
      timestamp: new Date(),
      // suggestions: [
      //   "Show this month expenses",
      //   "How much did I save?",
      //   "Top spending category",
      // ],
    },
  ]);

  // Close popup outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Auto scroll bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // Send Message
  // const handleSendMessage = (text) => {
  //   const messageText = text || inputValue;

  //   if (!messageText.trim()) return;

  //   // User message
  //   const userMessage = {
  //     id: Date.now(),
  //     type: "user",
  //     content: messageText,
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);

  //   setInputValue("");
  //   setIsTyping(true);

  //   // Fake AI response
  //   setTimeout(() => {
  //     const aiMessage = {
  //       id: Date.now() + 1,
  //       type: "ai",
  //       content:
  //         "Your financial summary looks good ✅ Keep tracking your savings regularly.",
  //       timestamp: new Date(),
  //     };

  //     setMessages((prev) => [...prev, aiMessage]);

  //     setIsTyping(false);
  //   }, 1500);
  // };

  const handleSendMessage = async (text) => {
    const messageText = text || inputValue;

    if (!messageText.trim()) return;

    // ✅ User Message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInputValue("");

    setIsTyping(true);

    try {
      // ✅ API CALL
      const response = await api.post("/ai/ask", {
        query: messageText,

        userId: userId,

        financialYear: financialYear,
      });

      console.log(response.data);

      // ✅ API DATA
      const aiData = response.data.paramObjectsMap.ai;

      // ✅ Dynamic Message
      let aiText = "";

      // if (aiData.yearlyIncome) {
      //   aiText = `Your yearly income is ₹${aiData.yearlyIncome}`;
      // } else if (aiData.yearlyExpense) {
      //   aiText = `Your yearly expense is ₹${aiData.yearlyExpense}`;
      // } else {
      //   aiText = "No financial data found.";
      // }
      if (aiData.yearlyIncome) {
        aiText = `Your yearly income is ₹${aiData.yearlyIncome.toLocaleString("en-IN") || 0}`;
      } else if (aiData.yearlyExpense) {
        aiText = `Your yearly expense is ₹${aiData.yearlyExpense.toLocaleString("en-IN") || 0}`;
      } else if (aiData.monthlyIncome) {
        aiText = `Your ${aiData.month} income is ₹${aiData.monthlyIncome.toLocaleString("en-IN") || 0}`;
      } else if (aiData.monthlyExpense) {
        aiText = `Your ${aiData.month} expense is ₹${aiData.monthlyExpense.toLocaleString("en-IN") || 0}`;
      }

      // ✅ AI Message
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: "Something went wrong with AI API.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="relative hidden md:flex" ref={menuRef}>
      {/* AI Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          justify-center
          w-7
          h-7
          rounded-lg
          bg-gradient-to-br
          from-purple-600
          to-blue-600
          shadow-lg
          hover:shadow-purple-500/40
          transition-all
        "
      >
        <Sparkles className="w-4 h-4 text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            {/* Chat Popup */}
            <motion.div
              initial={{
                opacity: 0,
                x: 80,
                // scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                // scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 80,
                // scale: 0.96,
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className="
                fixed
                 top-0
                right-0
                w-[380px]
                h-[628px]
                bg-white
                dark:bg-gray-900
                
                overflow-hidden
                shadow-2xl
                border
                border-gray-200
                dark:border-gray-800
                z-50
                flex
                flex-col
              "
            >
              {/* Header */}
              <div className="relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600" />

                <motion.div
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                />

                <div className="relative p-3">
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          rotate: [0, 5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-white/20
                          backdrop-blur-md
                          border
                          border-white/20
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </motion.div>

                      <div>
                        <h2 className="text-md font-bold text-white">
                          AI Financial Assistant
                        </h2>

                        <p className="text-sm text-white/80">
                          Smart Finance Insights
                        </p>
                      </div>
                    </div>

                    {/* Close */}
                    <button
                      onClick={() => setOpen(false)}
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white/10
                        hover:bg-white/20
                        border
                        border-white/20
                        flex
                        items-center
                        justify-center
                        transition-all
                      "
                    >
                      <X className="w-5 h-5 text-white hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50 dark:bg-gray-950">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* AI Message */}
                    {message.type === "ai" ? (
                      <div className="flex gap-3 max-w-[85%]">
                        {/* Bot Icon */}
                        <div
                          className="
                            w-10
                            h-7
                            rounded-lg
                            bg-gradient-to-br
                            from-purple-600
                            to-blue-600
                            flex
                            items-center
                            justify-center
                            shadow-lg
                          "
                        >
                          <Bot className="w-6 h-6 text-white" />
                        </div>

                        <div>
                          {/* Message */}
                          <div
                            className="
                              bg-white
                              dark:bg-gray-800
                              border
                              border-gray-200
                              dark:border-gray-700
                              shadow-md
                              rounded-2xl
                              rounded-tl-sm
                              px-4
                              py-3
                            "
                          >
                            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                              {message.content}
                            </p>
                          </div>

                          {/* Suggestions */}
                          {/* {message.suggestions && (
                            <div className="mt-3 space-y-2">
                              {message.suggestions.map((item, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSendMessage(item)}
                                  className="
                                    w-full
                                    flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-xl
                                    border
                                    border-gray-200
                                    dark:border-gray-700
                                    bg-white
                                    dark:bg-gray-800
                                    hover:border-purple-500
                                    hover:bg-purple-50
                                    dark:hover:bg-gray-700
                                    transition-all
                                    text-sm
                                  "
                                >
                                  <Zap className="w-4 h-4 text-purple-600" />

                                  <span>{item}</span>
                                </button>
                              ))}
                            </div>
                          )} */}

                          {/* Time */}
                          <p className="text-xs text-gray-400 mt-2">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // User Message
                      <div className="max-w-[85%]">
                        <div
                          className="
                            bg-gradient-to-r
                            from-purple-600
                            to-blue-600
                            px-4
                            py-3
                            rounded-2xl
                            rounded-tr-sm
                            shadow-lg
                          "
                        >
                          <p className="text-sm text-white leading-relaxed">
                            {message.content}
                          </p>
                        </div>

                        <p className="text-xs text-gray-400 mt-2 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div
                      className="
                        w-9
                        h-9
                        rounded-xl
                        bg-gradient-to-br
                        from-purple-600
                        to-blue-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </div>

                    <div
                      className="
                        bg-white
                        dark:bg-gray-800
                        rounded-2xl
                        rounded-tl-sm
                        px-4
                        py-3
                        border
                        border-gray-200
                        dark:border-gray-700
                        shadow-md
                      "
                    >
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map((delay, index) => (
                          <motion.div
                            key={index}
                            animate={{
                              y: [0, -5, 0],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay,
                            }}
                            className="w-2 h-2 bg-purple-600 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {/* Input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about your finance..."
                      className="
                        w-full
                        px-4
                        py-2
                        pr-12
                        rounded-2xl
                        bg-gray-100
                        dark:bg-gray-800
                        border
                        border-gray-200
                        dark:border-gray-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-purple-500
                        transition-all
                      "
                    />

                    <Sparkles
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-gray-400
                      "
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="
                      w-10
                      h-10
                      rounded-lg
                      bg-gradient-to-r
                      from-purple-600
                      to-blue-600
                      hover:from-purple-700
                      hover:to-blue-700
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      transition-all
                    "
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinancialAi;
