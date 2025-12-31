import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { marked } from 'marked';
import './App.css'

const sessionId = uuid();
const API_URL = "http://localhost:5000/chat";

// Configure marked for better code block rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(m => [...m, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userMessage })
      });

      const data = await res.json();

      if (data.error) {
        setMessages(m => [...m, { role: "bot", text: `Error: ${data.error}` }]);
      } else {
        setMessages(m => [...m, { role: "bot", text: data.reply }]);
      }
    } catch (error) {
      setMessages(m => [...m, { role: "bot", text: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 40px)"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px 30px",
          color: "white",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h1 style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <span style={{ fontSize: 28 }}>🤖</span>
            AI Chat Assistant
          </h1>
          <p style={{
            margin: "5px 0 0 0",
            opacity: 0.9,
            fontSize: 14
          }}>
            Powered by Llama 3.1 • Ask me anything!
          </p>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 30px",
          backgroundColor: "#f8f9fa"
        }}>
          {messages.length === 0 && (
            <div style={{
              textAlign: "center",
              marginTop: "20%",
              color: "#6c757d"
            }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>💬</div>
              <h3 style={{ margin: "0 0 10px 0", color: "#495057" }}>Start a conversation</h3>
              <p style={{ margin: 0, fontSize: 14 }}>Ask me anything and I'll help you out!</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 16,
                animation: "fadeIn 0.3s ease-in"
              }}
            >
              <div style={{
                maxWidth: "75%",
                display: "flex",
                gap: 10,
                flexDirection: m.role === "user" ? "row-reverse" : "row"
              }}>
                {/* Avatar */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: m.role === "user" ? "#667eea" : "#28a745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  {m.role === "user" ? "👤" : "🤖"}
                </div>

                {/* Message Bubble */}
                <div style={{
                  backgroundColor: m.role === "user" ? "#667eea" : "white",
                  color: m.role === "user" ? "white" : "#212529",
                  padding: "12px 16px",
                  borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  wordWrap: "break-word"
                }}>
                  {m.role === "bot" ? (
                    <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{ __html: marked(m.text) }}
                      style={{
                        lineHeight: 1.6,
                        fontSize: 15
                      }}
                    />
                  ) : (
                    <div style={{ lineHeight: 1.6, fontSize: 15 }}>{m.text}</div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{
              display: "flex",
              gap: 10,
              marginBottom: 16
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#28a745",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18
              }}>
                🤖
              </div>
              <div style={{
                backgroundColor: "white",
                padding: "12px 16px",
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                gap: 4
              }}>
                <span className="typing-dot" style={{ animationDelay: "0s" }}>●</span>
                <span className="typing-dot" style={{ animationDelay: "0.2s" }}>●</span>
                <span className="typing-dot" style={{ animationDelay: "0.4s" }}>●</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: "20px 30px",
          backgroundColor: "white",
          borderTop: "1px solid #dee2e6"
        }}>
          <div style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-end"
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={loading}
              rows={1}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 12,
                border: "2px solid #e9ecef",
                fontSize: 15,
                fontFamily: "inherit",
                resize: "none",
                outline: "none",
                transition: "border-color 0.2s",
                minHeight: 48,
                maxHeight: 120
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: "12px 24px",
                borderRadius: 12,
                backgroundColor: loading || !input.trim() ? "#ccc" : "#667eea",
                color: "white",
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: 15,
                fontWeight: 600,
                transition: "all 0.2s",
                minWidth: 100,
                height: 48
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.target.style.backgroundColor = "#5568d3";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = loading || !input.trim() ? "#ccc" : "#667eea";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
