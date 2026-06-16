import { useState, useRef, useEffect } from "react";

const PROXY_URL = "https://english-writer.dolevgot.workers.dev";
const DOCS_BASE = "https://dolevgot.github.io/colorado-2026/docs/";

const T = {
  he: {
    dir: "rtl",
    title: "עוזר הטיול – קולורדו 2026",
    subtitle: "30 יוני – 8 יולי · 8 ימים · 5 יעדים",
    updateFile: "עדכן קובץ",
    close: "סגור",
    uploadHint: "העלה קובץ טקסט מעודכן (.txt, .md)",
    loaded: "טעון כעת:",
    chooseFile: "בחר קובץ מהמכשיר",
    sessionOnly: "הקובץ יישמר רק בסשן הנוכחי",
    selectDays: "בחר ימים (אפשרי מרובים):",
    clearSelection: "✕ נקה בחירה",
    askAbout: "שאל על",
    allTrip: "כל הטיול",
    day: "יום",
    days: "ימים",
    emptyTitle: "בחר ימים ולחץ על כפתור",
    emptySubtitle: "או הקלד שאלה חופשית למטה",
    placeholder: "שאלה חופשית... (Enter לשליחה)",
    connError: "❌ שגיאת חיבור. נסה שוב.",
    defaultDoc: "תוכנית ברירת מחדל",
    dayLabels: ["יוני 30","יולי 1","יולי 2","יולי 3","יולי 4","יולי 5","יולי 6","יולי 7"],
    queries: [
      { id: "gear",     label: "🎒 ציוד",            prompt: (d) => `עבור ${d}, פרט את כל הציוד המומלץ – מחולק לקטגוריות. היה ספציפי לפעילויות ולמזג האוויר.` },
      { id: "weather",  label: "🌤️ מזג אוויר",       prompt: (d) => `תתאר את מזג האוויר הצפוי ב${d} – טמפרטורות בוקר/צהריים/ערב, סופות, גובה. כלול עצות פרקטיות.` },
      { id: "route",    label: "🗺️ מסלול ופעילויות", prompt: (d) => `תאר את המסלול המלא ל${d} שעה אחר שעה. כלול קישורי Google Maps לכל מיקום. ציין נקודות קריטיות.` },
      { id: "driving",  label: "🚗 זמני נסיעה",      prompt: (d) => `מה זמן הנסיעה הכולל ל${d}? פרט כל קטע, כביש, ומשך. כלול קישורי Google Maps. ציין איפה לתדלק.` },
      { id: "food",     label: "🍽️ איפה לאכול",      prompt: (d) => `המלץ על מסעדות ל${d} – בוקר/צהריים/ערב, עם שמות ספציפיים, מחיר משוער, וקישורי Google Maps.` },
      { id: "shopping", label: "🛒 קניות בסופר",     prompt: (d) => `עבור ${d}, מה לקנות ומתי? רשימה מפורטת עם כמויות למשפחה של 5, איזה סופר (עם קישור Google Maps).` },
    ],
    systemLang: "Hebrew",
  },
  en: {
    dir: "ltr",
    title: "Colorado 2026 · Trip Assistant",
    subtitle: "Jun 30 – Jul 8 · 8 days · 5 destinations",
    updateFile: "Update file",
    close: "Close",
    uploadHint: "Upload updated text file (.txt, .md)",
    loaded: "Currently loaded:",
    chooseFile: "Choose file from device",
    sessionOnly: "File stored for this session only",
    selectDays: "Select days (multiple allowed):",
    clearSelection: "✕ Clear",
    askAbout: "Ask about",
    allTrip: "the whole trip",
    day: "Day",
    days: "Days",
    emptyTitle: "Select days and tap a button",
    emptySubtitle: "Or type a free question below",
    placeholder: "Free question... (Enter to send)",
    connError: "❌ Connection error. Try again.",
    defaultDoc: "Default plan",
    dayLabels: ["Jun 30","Jul 1","Jul 2","Jul 3","Jul 4","Jul 5","Jul 6","Jul 7"],
    queries: [
      { id: "gear",     label: "🎒 Gear",                prompt: (d) => `For ${d}, list all recommended gear by category. Be specific to activities and weather.` },
      { id: "weather",  label: "🌤️ Weather",             prompt: (d) => `Describe expected weather for ${d} – morning/afternoon/evening temps, storms, altitude. Practical tips.` },
      { id: "route",    label: "🗺️ Route & Activities",  prompt: (d) => `Describe the full route for ${d} hour by hour. Include Google Maps links for every location. Highlight critical points.` },
      { id: "driving",  label: "🚗 Drive times",         prompt: (d) => `Total driving for ${d}? Detail each segment, highway, duration. Google Maps navigation links. Note fuel stops.` },
      { id: "food",     label: "🍽️ Where to eat",        prompt: (d) => `Recommend restaurants for ${d} – breakfast, lunch, dinner with names, price, Google Maps links.` },
      { id: "shopping", label: "🛒 Grocery list",        prompt: (d) => `For ${d}, what to buy and when? List with quantities for family of 5, which store with Google Maps link.` },
    ],
    systemLang: "English",
  },
};

const DAYS_META = [
  { num: 1, emoji: "✈️",  location: "Colorado Springs → Mosca" },
  { num: 2, emoji: "🏜️", location: "Great Sand Dunes" },
  { num: 3, emoji: "🚣", location: "Buena Vista – Rafting" },
  { num: 4, emoji: "🥾", location: "Ptarmigan & Hot Springs" },
  { num: 5, emoji: "🎆", location: "Independence Day!" },
  { num: 6, emoji: "🚵", location: "Leadville → Aspen" },
  { num: 7, emoji: "🌄", location: "Maroon Bells ✨" },
  { num: 8, emoji: "🦌", location: "RMNP → Denver" },
];

async function loadPdfJs() {
  if (window._pdfjsLib) return window._pdfjsLib;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  const lib = window["pdfjs-dist/build/pdf"];
  lib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  window._pdfjsLib = lib;
  return lib;
}

async function extractPdfText(file) {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    pages.push(textContent.items.map(item => item.str).join(" "));
  }
  return pages.join("\n");
}

function buildSystemPrompt(docs, lang) {
  const combined = docs
    .map(d => `### ${d.name}\n${d.content}`)
    .join("\n\n---\n\n");
  return `You are a knowledgeable trip assistant for the Shuv family's Colorado road trip, June 30 – July 8, 2026.
Answer ONLY in ${lang}. Be concise and practical.
Always include Google Maps links for locations: [Place Name](https://maps.google.com/?q=URL_ENCODED_ADDRESS)
For driving: [Navigate](https://www.google.com/maps/dir/ORIGIN/DESTINATION)
Format with emojis and bullet points for easy mobile reading.
When information spans multiple documents, synthesize across all of them.

DOCUMENTS:
${combined}`;
}

function renderMessageContent(content) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const segments = [];
  let lastIndex = 0, match, k = 0;
  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) segments.push(<span key={k++}>{content.slice(lastIndex, match.index)}</span>);
    segments.push(
      <a key={k++} href={match[2]} target="_blank" rel="noopener noreferrer"
        style={{ color: "#60b4ff", textDecoration: "underline", textUnderlineOffset: "2px" }}>
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) segments.push(<span key={k++}>{content.slice(lastIndex)}</span>);
  return segments;
}

export default function ColoradoAssistant() {
  const [lang, setLang] = useState("he");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [tripDocs, setTripDocs] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const t = T[lang];
  const isHe = lang === "he";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch(DOCS_BASE + "manifest.json");
        if (!res.ok) throw new Error("manifest.json not found");
        const { documents } = await res.json();
        const loaded = await Promise.all(
          documents.map(async (doc) => {
            const r = await fetch(DOCS_BASE + doc.file);
            if (!r.ok) throw new Error(`Cannot load ${doc.file}`);
            if (doc.file.endsWith(".pdf")) {
              const blob = await r.blob();
              const text = await extractPdfText(blob);
              return { name: doc.name, content: text };
            }
            return { name: doc.name, content: await r.text() };
          })
        );
        setTripDocs(loaded);
      } catch (err) {
        setDocsError(err.message);
      } finally {
        setDocsLoading(false);
      }
    }
    loadDocs();
  }, []);

  function toggleDay(num) {
    setSelectedDays(prev => prev.includes(num) ? prev.filter(d => d !== num) : [...prev, num].sort((a,b) => a-b));
  }

  async function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        let content;
        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          content = await extractPdfText(file);
        } else {
          content = await file.text();
        }
        setTripDocs(prev => [...prev, { name: file.name, content }]);
      }
    } catch(err) {
      alert("שגיאה בקריאת הקובץ: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeDoc(i) {
    setTripDocs(prev => prev.filter((_, j) => j !== i));
    setMessages([]);
  }

  function getDayLabel() {
    if (selectedDays.length === 0) return t.allTrip;
    if (selectedDays.length === 1) return `${t.day} ${selectedDays[0]}`;
    return `${t.days} ${selectedDays.join(", ")}`;
  }

  function buildDaysStr() {
    if (selectedDays.length === 0) return t.allTrip;
    return selectedDays.map(d => {
      const meta = DAYS_META.find(x => x.num === d);
      return `Day ${d} (${t.dayLabels[d-1]}, ${meta?.location})`;
    }).join("; ");
  }

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    const userMsg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: buildSystemPrompt(tripDocs, t.systemLang),
          messages: newMessages,
        }),
      });
      const data = await response.json();
      const assistantText = data.content?.map(b => b.text || "").join("") || t.connError;
      setMessages(prev => [...prev, { role: "assistant", content: assistantText }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: t.connError }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  if (docsLoading) return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(160deg, #0b1d35 0%, #0f2d4a 40%, #0d2218 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      color: "#e8f0fe", fontFamily: "'Segoe UI', system-ui, sans-serif", gap: "16px",
    }}>
      <div style={{ fontSize: "48px" }}>🏔️</div>
      <div style={{ fontSize: "16px", fontWeight: 600 }}>Colorado 2026</div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[0,1,2].map(j => (
          <div key={j} style={{
            width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.5)",
            animation: "bounce 1.2s ease-in-out infinite", animationDelay: `${j*0.2}s`,
          }} />
        ))}
      </div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>טוען מסמכים...</div>
    </div>
  );

  if (docsError) return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(160deg, #0b1d35 0%, #0f2d4a 40%, #0d2218 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      color: "#e8f0fe", fontFamily: "'Segoe UI', system-ui, sans-serif", gap: "12px", padding: "24px",
    }}>
      <div style={{ fontSize: "36px" }}>⚠️</div>
      <div style={{ fontSize: "15px", fontWeight: 600 }}>שגיאה בטעינת המסמכים</div>
      <div style={{ fontSize: "12px", color: "rgba(255,100,100,0.8)", textAlign: "center" }}>{docsError}</div>
      <button onClick={() => window.location.reload()} style={{
        background: "linear-gradient(135deg, #1d6fa4, #1a5c8a)", border: "none",
        borderRadius: "8px", padding: "8px 20px", color: "white", fontSize: "13px", cursor: "pointer",
      }}>נסה שוב</button>
    </div>
  );

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(160deg, #0b1d35 0%, #0f2d4a 40%, #0d2218 100%)",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      color: "#e8f0fe", direction: t.dir,
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontSize: "22px" }}>🏔️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.title}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>{t.subtitle}</div>
          </div>
          <button onClick={() => { setLang(l => l === "he" ? "en" : "he"); setMessages([]); }} style={{
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "20px", padding: "4px 10px", color: "#e8f0fe",
            fontSize: "12px", fontWeight: 600, cursor: "pointer", flexShrink: 0,
          }}>{isHe ? "🇺🇸 EN" : "🇮🇱 עב"}</button>
          <button onClick={() => setShowUpload(v => !v)} style={{
            background: showUpload ? "rgba(100,180,255,0.18)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px",
            padding: "4px 9px", color: "#e8f0fe", fontSize: "11px", cursor: "pointer", flexShrink: 0,
          }}>📂 {showUpload ? t.close : t.updateFile}</button>
        </div>

        {showUpload && (
          <div style={{ marginTop: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>{t.uploadHint}</div>

            {/* Document list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "8px" }}>
              {tripDocs.map((doc, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "rgba(255,255,255,0.06)", borderRadius: "7px", padding: "5px 8px",
                }}>
                  <span style={{ fontSize: "13px" }}>{doc.name.endsWith(".pdf") ? "📕" : "📄"}</span>
                  <span style={{ flex: 1, fontSize: "11px", color: "rgba(255,255,255,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
                  {i > 0 && (
                    <button onClick={() => removeDoc(i)} style={{
                      background: "none", border: "none", color: "rgba(255,100,100,0.7)",
                      fontSize: "13px", cursor: "pointer", padding: "0 2px", flexShrink: 0,
                    }}>✕</button>
                  )}
                </div>
              ))}
            </div>

            <input ref={fileInputRef} type="file" accept=".txt,.md,.pdf" multiple onChange={handleFileUpload} style={{ display: "none" }} />
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading} style={{
              background: uploading ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #1d6fa4, #1a5c8a)",
              border: "none", borderRadius: "8px", padding: "8px 16px",
              color: "white", fontSize: "12px", cursor: uploading ? "default" : "pointer", width: "100%",
            }}>{uploading ? "⏳ מעבד..." : t.chooseFile}</button>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", marginTop: "5px", textAlign: "center" }}>{t.sessionOnly}</div>
          </div>
        )}

        {/* Day selector */}
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>{t.selectDays}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
            {DAYS_META.map(day => {
              const sel = selectedDays.includes(day.num);
              return (
                <button key={day.num} onClick={() => toggleDay(day.num)} style={{
                  background: sel ? "linear-gradient(135deg, #1d6fa4, #0e4a72)" : "rgba(255,255,255,0.06)",
                  border: sel ? "1px solid rgba(100,180,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", padding: "6px 4px", color: sel ? "#fff" : "rgba(255,255,255,0.6)",
                  fontSize: "11px", cursor: "pointer", textAlign: "center", lineHeight: 1.3,
                }}>
                  <div style={{ fontSize: "13px" }}>{day.emoji}</div>
                  <div style={{ fontWeight: 600 }}>{t.day} {day.num}</div>
                  <div style={{ fontSize: "9px", opacity: 0.7 }}>{t.dayLabels[day.num-1]}</div>
                </button>
              );
            })}
          </div>
          {selectedDays.length > 0 && (
            <button onClick={() => setSelectedDays([])} style={{
              marginTop: "4px", background: "none", border: "none",
              color: "rgba(255,255,255,0.32)", fontSize: "10px", cursor: "pointer", padding: "2px 0",
            }}>{t.clearSelection}</button>
          )}
        </div>

        {/* Query buttons */}
        <div style={{ marginTop: "8px" }}>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>
            {t.askAbout} {getDayLabel()}:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
            {t.queries.map(qt => (
              <button key={qt.id} onClick={() => sendMessage(qt.prompt(buildDaysStr()))} disabled={loading} style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "7px 5px",
                color: loading ? "rgba(255,255,255,0.25)" : "#e8f0fe",
                fontSize: "11px", cursor: loading ? "default" : "pointer", textAlign: "center",
              }}>{qt.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: "rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: "36px", marginBottom: "10px" }}>🌄</div>
            <div style={{ fontSize: "14px" }}>{t.emptyTitle}</div>
            <div style={{ fontSize: "12px", marginTop: "4px" }}>{t.emptySubtitle}</div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? (isHe ? "flex-start" : "flex-end") : (isHe ? "flex-end" : "flex-start") }}>
            <div style={{
              maxWidth: "88%", padding: "10px 14px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "linear-gradient(135deg, #1d6fa4, #1a5c8a)" : "rgba(255,255,255,0.08)",
              border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
              fontSize: "13px", lineHeight: 1.65, wordBreak: "break-word", direction: "auto",
            }}>
              {msg.role === "assistant"
                ? <span style={{ whiteSpace: "pre-wrap" }}>{renderMessageContent(msg.content)}</span>
                : msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: isHe ? "flex-end" : "flex-start" }}>
            <div style={{
              padding: "10px 16px", borderRadius: "16px 16px 16px 4px",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", gap: "5px", alignItems: "center",
            }}>
              {[0,1,2].map(j => (
                <div key={j} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.5)",
                  animation: "bounce 1.2s ease-in-out infinite",
                  animationDelay: `${j*0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", flexShrink: 0,
      }}>
        <div style={{
          display: "flex", gap: "8px", alignItems: "flex-end",
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)",
          borderRadius: "12px", padding: isHe ? "7px 7px 7px 12px" : "7px 12px 7px 7px",
          flexDirection: isHe ? "row-reverse" : "row",
        }}>
          <textarea
            ref={inputRef} value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder={t.placeholder} rows={1}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#e8f0fe", fontSize: "13px", resize: "none", lineHeight: 1.5,
              maxHeight: "80px", overflowY: "auto",
              direction: isHe ? "rtl" : "ltr", textAlign: isHe ? "right" : "left",
              fontFamily: "inherit",
            }}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
            background: input.trim() && !loading ? "linear-gradient(135deg, #1d6fa4, #1a5c8a)" : "rgba(255,255,255,0.08)",
            border: "none", borderRadius: "8px", width: "32px", height: "32px",
            cursor: input.trim() && !loading ? "pointer" : "default",
            color: "white", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>↑</button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        textarea::placeholder { color: rgba(255,255,255,0.28); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
      `}</style>
    </div>
  );
}
