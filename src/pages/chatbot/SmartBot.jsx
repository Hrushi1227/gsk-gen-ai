import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function SmartBot() {
  const suggested = [
    "Show me which stage for Benlysta SC is a bottleneck?",
    "Highlight the 15% most impacted work centers in terms of production volume between Models 2025 Baseline under Base-PoS and Upside-PoS",
    "Summarize the operational differences in Models 2025 Baseline under Base-PoS and Upside-PoS scenario",
    "Show the top 10% of facilities with the highest differences in utilization between Models 2025 Baseline and Models 2025 Performance Decrease models",
    "Summarize the operational differences in CF06 between the Models 2025 Baseline and Models 2025 Performance Decrease models",
    "For BC site, how many manufacturing lines are there by stage?",
    "When does RKV site run out of capacity based on models 45 & Model Baseline?",
    "Show me the Make v/s Demand for the Benlysta IV Filling Stage?",
    "Show me the capacity units in kga for Samsung and RKV sites?",
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      by: "system",
      text: "Welcome — ask me about sites, forecasts, or models.",
    },
  ]);
  const [input, setInput] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text, attachments) => {
    if (!text?.trim() && !attachments) return;
    const newMsg = {
      id: Date.now(),
      by: "user",
      text: text.trim(),
      attachments: attachments || null,
    };
    setMessages((m) => [...m, newMsg]);

    // placeholder bot response (simulate)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          by: "bot",
          text: `Got it — I’m generating results for: "${text}"`,
        },
      ]);
    }, 700);

    setInput("");
    setAttachmentName("");
    if (inputRef.current) inputRef.current.focus();
  };

  const onSuggestClick = (q) => {
    setInput(q);
    if (inputRef.current) inputRef.current.focus();
  };

  const onAttach = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setAttachmentName(f.name);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input, attachmentName || null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-2">LTDF-NM Smart Assistant</h1>
        <p className="text-gray-600 mb-6">
          This chatbot is designed to empower stakeholders with actionable
          insights into production capacity, demand allocation, and operational
          efficiency.
        </p>

        <div className="card-shadow rounded-2xl p-6 flex flex-col h-[72vh]">
          {/* Top: Suggested Questions */}
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-2">
              Suggested Questions:
            </div>
            <div className="flex flex-wrap gap-3">
              {suggested.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestClick(q)}
                  className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
                  title="Click to insert question"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto px-2 py-3 border-t border-b border-transparent"
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={m.by === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={`inline-block p-3 rounded-xl ${
                      m.by === "user"
                        ? "bg-orange-50 text-gskOrange"
                        : "bg-gray-100 text-gray-800"
                    }`}
                    style={{ maxWidth: "78%" }}
                  >
                    <div className="text-sm">{m.text}</div>
                    {m.attachments && (
                      <div className="mt-2 text-xs text-gray-600">
                        Attachment: {m.attachments}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom input row */}
          <div className="mt-4 pt-3 border-t">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input type="file" onChange={onAttach} className="hidden" />
                <PaperClipOutlined className="text-lg text-gray-500 hover:text-gray-700" />
              </label>

              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message..."
                  className="w-full rounded-full px-4 py-3 border border-gray-200 focus:border-gskOrange focus:outline-none resize-none"
                  rows={1}
                />
                {attachmentName && (
                  <div className="text-xs text-gray-500 mt-1">
                    Attached: {attachmentName}
                  </div>
                )}
              </div>

              <button
                onClick={() => sendMessage(input, attachmentName || null)}
                className="h-12 w-12 rounded-full bg-gskOrange text-white flex items-center justify-center shadow-md hover:brightness-95"
                aria-label="Send"
              >
                <SendOutlined />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
