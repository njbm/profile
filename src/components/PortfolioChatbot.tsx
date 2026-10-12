import { useState, useRef, useEffect, CSSProperties } from "react";
import { supabase } from "@/integrations/supabase/client";

const BOOT_LINES = [
  { text: "initializing portfolio.ai...", delay: 0 },
  { text: "loading context...", delay: 450 },
  { text: "model connected ✓", delay: 900 },
  { text: "ready — ask me anything about Jaber!", delay: 1350 },
];

const QUICK_QUESTIONS = [
  "What are your skills?",
  "Tell me about your projects",
  "How can I contact you?",
  "What's your experience?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TextBlock {
  type: "paragraph" | "tagged";
  text: string;
  label?: string;
}

function renderAIText(text: string) {
  let clean = text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^[\s]*[-•*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "");

  const lines = clean.split("\n").map(l => l.trim()).filter(Boolean);
  const blocks: TextBlock[] = [];
  let currentParagraph: string[] = [];

  lines.forEach((line) => {
    const labelMatch = line.match(/^([A-Za-z &\/\-]+):\s*(.+)$/);
    if (labelMatch && labelMatch[1].length < 30) {
      if (currentParagraph.length) {
        blocks.push({ type: "paragraph", text: currentParagraph.join(" ") });
        currentParagraph = [];
      }
      blocks.push({ type: "tagged", label: labelMatch[1], text: labelMatch[2] });
    } else if (line === "") {
      if (currentParagraph.length) {
        blocks.push({ type: "paragraph", text: currentParagraph.join(" ") });
        currentParagraph = [];
      }
    } else {
      currentParagraph.push(line);
    }
  });

  if (currentParagraph.length) {
    blocks.push({ type: "paragraph", text: currentParagraph.join(" ") });
  }

  const tagColors = ["#00ff88", "#00c9ff", "#ff6b9d", "#ffd93d", "#a78bfa", "#fb923c"];
  let tagIndex = 0;

  return blocks.map((block, i) => {
    if (block.type === "tagged") {
      const color = tagColors[tagIndex % tagColors.length];
      tagIndex++;
      return (
        <div key={i} style={styles.taggedRow}>
          <span style={{ ...styles.tagLabel, color, borderColor: `${color}40` }}>
            {block.label}
          </span>
          <span style={styles.tagText}>{block.text}</span>
        </div>
      );
    }
    return <p key={i} style={styles.paragraphText}>{block.text}</p>;
  });
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [booted, setBooted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bootIndex]);

  useEffect(() => {
    if (!isOpen || booted) return;
    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => setBootIndex((i) => i + 1), BOOT_LINES[bootIndex].delay + 300);
      return () => clearTimeout(timer);
    } else {
      setBooted(true);
    }
  }, [isOpen, bootIndex, booted]);

  useEffect(() => {
    if (isOpen && booted) inputRef.current?.focus();
  }, [isOpen, booted]);

  const sendMessage = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg || isLoading) return;

    setInput("");
    const newUserMessage: Message = { role: "user", content: userMsg };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data, error } = await supabase.functions.invoke("portfolio-chat", {
        body: {
          messages: [...history, { role: "user", content: userMsg }],
        },
      });

      if (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "⚠️ Connection error. Please try again." },
        ]);
      } else {
        const aiText = data?.content || "Sorry, I couldn't process that. Try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Connection error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div style={styles.wrapper}>
      {isOpen && (
        <div style={styles.window}>
          {/* Title Bar */}
          <div style={styles.titleBar}>
            <div style={styles.dots}>
              <span style={{ ...styles.dot, background: "#ff5f56" }} onClick={handleClose} />
              <span style={{ ...styles.dot, background: "#ffbd2e" }} onClick={handleClose} />
              <span style={{ ...styles.dot, background: "#27ca3f" }} onClick={handleClose} />
            </div>
            <span style={styles.titleText}>portfolio.ai</span>
            <span style={styles.closeX} onClick={handleClose}>×</span>
          </div>

          {/* Messages */}
          <div style={styles.messagesArea}>
            {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
              <div key={i} style={styles.bootLine}>
                <span style={styles.bootPrompt}>{i === BOOT_LINES.length - 1 ? "›" : "$"}</span>
                <span>{line.text}</span>
              </div>
            ))}

            {messages.map((msg, i) => (
              <div key={i} style={styles.msgWrapper}>
                {msg.role === "user" ? (
                  <div style={styles.userBubble}>
                    <span style={styles.userIcon}>you</span>
                    <span style={styles.userText}>{msg.content}</span>
                  </div>
                ) : (
                  <div style={styles.aiBubble}>
                    <div style={styles.aiHeader}>
                      <span style={styles.aiIcon}>AI</span>
                      <span style={styles.aiHeaderDot} />
                      <span style={styles.aiHeaderTime}>
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div style={styles.aiBody}>{renderAIText(msg.content)}</div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div style={styles.msgWrapper}>
                <div style={styles.aiHeader}>
                  <span style={styles.aiIcon}>AI</span>
                  <span style={styles.aiHeaderDot} />
                </div>
                <div style={styles.aiBody}>
                  <div style={styles.typingDots}>
                    <span style={{ ...styles.typingDot, animationDelay: "0s" }} />
                    <span style={{ ...styles.typingDot, animationDelay: "0.2s" }} />
                    <span style={{ ...styles.typingDot, animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {booted && messages.length === 0 && (
            <div style={styles.quickArea}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  style={styles.quickBtn}
                  onClick={() => sendMessage(q)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#00ff88";
                    (e.currentTarget as HTMLButtonElement).style.background = "#00ff8812";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a3e";
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          {booted && (
            <div style={styles.inputBar}>
              <input
                ref={inputRef}
                type="text"
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Jaber..."
                disabled={isLoading}
              />
              <button
                style={{ ...styles.sendBtn, opacity: isLoading || !input.trim() ? 0.5 : 1 }}
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                onMouseEnter={(e) => {
                  if (!isLoading && input.trim()) (e.currentTarget as HTMLButtonElement).style.background = "#00ff8820";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Trigger Bubble */}
      <button
        style={styles.bubble}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 32px rgba(0,255,136,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(0,255,136,0.3)";
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a14" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0a14" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
        {!isOpen && <span style={styles.bubblePing} />}
      </button>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "fixed",
    bottom: 28,
    left: 28,
    zIndex: 9999,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  },

  bubble: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00ff88 0%, #00c9ff 100%)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 24px rgba(0,255,136,0.3)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    position: "relative",
  },
  bubblePing: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "#ff5f57",
    border: "2px solid #0d0d1a",
    animation: "chatPing 2s infinite",
  },

  window: {
    position: "absolute",
    bottom: 80,
    left: 0,
    width: 560,
    height: 620,
    background: "#0d0d1a",
    borderRadius: 16,
    border: "1px solid #2a2a3e",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,136,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    animation: "chatSlideUp 0.28s cubic-bezier(0.4,0,0.2,1)",
  },

  titleBar: {
    background: "#141428",
    padding: "12px 18px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderBottom: "1px solid #1e1e32",
  },
  dots: { display: "flex", gap: 7 },
  dot: { width: 13, height: 13, borderRadius: "50%", cursor: "pointer", transition: "filter 0.2s" },
  titleText: {
    flex: 1,
    textAlign: "center",
    color: "#444",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  closeX: { color: "#444", fontSize: 20, cursor: "pointer", lineHeight: 1, transition: "color 0.2s" },

  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 22px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  bootLine: {
    color: "#2e2e4a",
    fontSize: 13,
    lineHeight: 1.7,
    display: "flex",
    gap: 8,
    animation: "chatFadeIn 0.35s ease",
  },
  bootPrompt: { color: "#00ff88", fontWeight: 700, minWidth: 12 },

  msgWrapper: { animation: "chatFadeIn 0.3s ease" },
  userBubble: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-end",
  },
  userIcon: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#0a0a14",
    background: "linear-gradient(135deg, #00ff88, #00c9ff)",
    padding: "3px 7px",
    borderRadius: 10,
    textTransform: "uppercase",
  },
  userText: {
    color: "#e0e0e0",
    fontSize: 13.5,
    lineHeight: 1.5,
    background: "#1a1a2e",
    padding: "10px 14px",
    borderRadius: "12px 12px 4px 12px",
    border: "1px solid #252540",
    maxWidth: "75%",
  },

  aiBubble: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  aiHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  aiIcon: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#00c9ff",
    border: "1px solid #00c9ff33",
    padding: "3px 7px",
    borderRadius: 10,
    textTransform: "uppercase",
  },
  aiHeaderDot: { width: 4, height: 4, borderRadius: "50%", background: "#2e2e4a" },
  aiHeaderTime: { color: "#2e2e4a", fontSize: 10, letterSpacing: 0.5 },
  aiBody: {
    background: "#111124",
    border: "1px solid #1e1e32",
    borderRadius: "4px 12px 12px 12px",
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  paragraphText: {
    margin: 0,
    color: "#b0b0c8",
    fontSize: 13.5,
    lineHeight: 1.75,
    letterSpacing: 0.2,
  },
  taggedRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: "6px 0",
    borderBottom: "1px solid #1a1a2e",
  },
  tagLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 6,
    border: "1px solid",
    whiteSpace: "nowrap",
    flexShrink: 0,
    marginTop: 1,
  },
  tagText: {
    color: "#9898b0",
    fontSize: 13,
    lineHeight: 1.7,
  },

  typingDots: { display: "flex", gap: 5, padding: "2px 0" },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#2e2e4a",
    animation: "chatBounce 1.2s infinite ease-in-out",
  },

  quickArea: {
    padding: "0 22px 14px",
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
  },
  quickBtn: {
    background: "transparent",
    border: "1px solid #2a2a3e",
    color: "#00ff88",
    fontSize: 11.5,
    padding: "6px 13px",
    borderRadius: 20,
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "inherit",
    letterSpacing: 0.3,
  },

  inputBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 18px",
    borderTop: "1px solid #1e1e32",
    background: "#0a0a14",
  },
  input: {
    flex: 1,
    background: "#111124",
    border: "1px solid #1e1e32",
    borderRadius: 10,
    outline: "none",
    color: "#eee",
    fontSize: 13,
    fontFamily: "inherit",
    padding: "10px 14px",
    caretColor: "#00ff88",
    transition: "border-color 0.2s",
  },
  sendBtn: {
    background: "transparent",
    border: "1px solid #00ff8840",
    borderRadius: 10,
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "opacity 0.2s, background 0.2s",
    flexShrink: 0,
  },
};
