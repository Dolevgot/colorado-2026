import { useState, useRef, useEffect } from "react";
 
const DEFAULT_TRIP_DOC = `# Colorado 2026 – The Final Plan
 
June 30 – July 8 | Dunes · Rafting · Maroon Bells · Rocky Mountain | All reservations confirmed ✔
 
## Reservation & Confirmation Summary
 
| What | Date | Confirmation | Notes |
| The Parking Spot Fly | 6/30/2026 4:30 AM | 126714721 | Total Paid $96.80 |
| Flight DL2235: ATL → DEN | June 30, 7:25 – 8:35 AM | Delta | Direct, 3h 10m |
| Enterprise Minivan (Pacifica) | June 30, 9:00 AM – July 7, 8:00 PM | Costco C493144847 / Ent. 898208421 | $1,056.70 at the counter. Costco card is mandatory! |
| The Dunes Place (Airbnb), Mosca | June 30 – July 2 (2 nights) | Via Airbnb | Check-in: 4:00 – 11:00 PM, Host: Amanda |
| Sandboards – Sand Dunes Recreation | Pick-up: June 30, Evening | No reservation needed | ~$20 per item/24h, waiver required, 719-378-2807 |
| Noah's Ark Rafting – Browns Canyon PM | July 2, Check-in: 12:45 PM | #103232 | $604.68 paid. 719-395-2158 |
| Clocktower Flat (Airbnb), Buena Vista | July 2 – July 5 (3 nights) | Via Airbnb | Check-in: 3:00 – 9:00 PM, Manager: Melissa |
| Bicycles – Cycles of Life, Leadville | July 5, 10:30 AM – 1:30 PM | Email sent | 5 regular bikes. 719-486-5533 |
| Tyrolean Lodge, Aspen | July 5 – July 6 (1 night) | #51862161 | $303.35 paid. 2 Queens + Twin, kitchenette. 970-925-4595 |
| Maroon Bells Shuttle – Round Trip | July 6, 6:00 AM | VisitMaroonBells | $74 (4 adults + child). Return time is flexible |
| Lone Pine Cabins, Grand Lake | July 6 – July 7 (1 night) | See booking confirmation | Check-in from 4:00 PM, Queen + 2 sofas |
| Comfort Suites DEN | July 7 – July 8 (1 night) | Booking: 5042762440 PIN:4852 | $136.68 at the hotel. 3:00 AM shuttle arranged |
| Flight DL0341: DEN → ATL | July 8, 5:45 – 10:44 AM | Delta | Direct, 2h 59m |
 
## Master Schedule
 
Day 1 – Tuesday, June 30 | Lodging: The Dunes Place, Mosca
Location: Mosca, CO 81146 (San Luis Valley)
4:30 AM – The Parking Spot Fly, 3950 Conley St, College Park, GA 30337
7:25 AM – Flight DL2235 ATL→DEN (3h10m)
8:35 AM – Land Denver International Airport, baggage claim, Enterprise minivan pickup (Costco card required!)
10:00 AM – Drive I-25 South to Colorado Springs
11:20 AM – Garden of the Gods, Juniper Way Loop, Colorado Springs CO: Walk main paved trail + light lunch (free admission)
1:00 PM – Walmart Supercenter, 707 S 8th St, Colorado Springs CO: Grocery shopping (breakfast/lunch supplies, water, snacks)
4:30 PM – Check-in The Dunes Place, 506 Mill Run Rd, Mosca CO 81146 (HOA gate code needed)
5:15 PM – Drive to Hooper (25 mins)
5:45 PM – Sand Dunes Recreation, Hooper CO: Pick up 2 boards + 2 sleds (~$80 total), waiver required, soak in hot springs, dinner at Mile Deep Grille
9:00 PM – Early bedtime
Total driving: ~5.5 hours
 
Day 2 – Wednesday, July 1 | Great Sand Dunes | Lodging: The Dunes Place (Night 2)
Location: Great Sand Dunes National Park, Mosca CO
Sunrise ~5:50 AM. Sand reaches 50–60°C at noon – morning only!
6:45 AM – Drive to park (10 min from house)
7:00 AM – Great Sand Dunes National Park, 11999 CO-150, Mosca CO: Climb High Dune (~200m) + sandboarding + Medano Creek
12:15 PM – Return to Airbnb: Brunch + shower
1:30 PM – Afternoon Options: A) Colorado Gators Reptile Park, 9162 CO-17, Mosca (25 min, combines with board return), B) Del Monte Gun Club clay shooting (call 719-589-4155 to confirm), C) Rest
4:30 PM – Zapata Falls, Great Sand Dunes area (15 min from dunes): ~1km hike, water shoes required, 5km rough dirt road to trailhead
Before 5:45 PM – Return boards to Sand Dunes Recreation (within 24 hours!)
7:00 PM – Dinner at home or Calvillo's Mexican Restaurant / San Luis Valley Brewing Company, Alamosa CO (30 min)
9:00 PM – Optional stargazing (International Dark Sky Park). Moonrise ~10:00 PM. Warm layers!
Total driving: ~1 hour
 
Day 3 – Thursday, July 2 | Lodging: Clocktower Flat, Buena Vista
Location: 801 Swift Cir, Buena Vista CO 81211
Departure chores: towels to basket, linens on beds, dishwasher running, lock up
8:30 AM – Checkout Mosca (by 11 AM)
9:00 AM – Drive US-160 → US-285 to Buena Vista (pass through Poncha Pass)
11:00 AM – Light lunch in Buena Vista, downtown area
12:00 PM – Drop luggage at Clocktower Flat, 801 Swift Cir, Buena Vista CO
12:45 PM – CRITICAL: Check-in Noah's Ark Browns Canyon PM Rafting, US-285 South of Buena Vista, Booking #103232 (10 miles, Class III). Return ~5:00 PM.
5:30 PM – Check into Clocktower Flat. Shoes off at entrance! Quiet hours: 10 PM–7 AM.
7:00 PM – Festive dinner at South Main district, Buena Vista CO (2 min walk) + gelato
Total driving: ~2 hours
 
Day 4 – Friday, July 3 | Lodging: Clocktower Flat (Night 2)
Location: Buena Vista CO & Mount Princeton area
CRITICAL: Finish Ptarmigan by noon – afternoon storms!
7:30 AM – Ptarmigan Lake Trail, off CR-365 near Buena Vista: ~10.5 km round trip (3,700m)
1:00 PM – Lunch in Buena Vista downtown
2:30 PM – Mount Princeton Hot Springs Resort, 15870 County Road 162, Nathrop CO
7:00 PM – Relaxed evening in Buena Vista
Total driving: ~1 hour
 
Day 5 – Saturday, July 4 (Independence Day!) | Lodging: Clocktower Flat (Night 3)
Location: Buena Vista CO – everything on foot!
5:45 AM – Freedom 5K, Buena Vista CO
Noon – 4th of July Parade, downtown Buena Vista CO
McPhelemy Park, Buena Vista CO – Festival: food vendors, live music, games, beer garden
Afternoon – Rest, ice cream, SUP/tubing on Arkansas River
Evening – Fireworks. Pack tonight – checkout 10 AM sharp!
Total driving: 0
 
Day 6 – Sunday, July 5 | Lodging: Tyrolean Lodge, Aspen (#51862161)
Location: Leadville then Aspen CO
9:00 AM – Checkout Buena Vista (10 AM SHARP)
9:15 AM – Drive US-24 North to Leadville
10:00 AM – Temple Israel Museum, 201 W 4th St, Leadville CO (free, call 303-709-7050)
10:45 AM – Cycles of Life, 309 Harrison Ave, Leadville CO. Mineral Belt Trail: 19km paved loop
1:30 PM – Return bikes + lunch on Harrison Ave, Leadville CO
2:30 PM – Independence Pass, CO-82, summit 3,687m
4:15 PM – Tyrolean Lodge, 200 W Main St, Aspen CO. Arrange 5:15 AM departure. No smoking ($200 fine).
5:30 PM – Walk Aspen center, early dinner. Lights out 9:30 PM!
Total driving: ~2.5 hours
 
Day 7 – Monday, July 6 | THE BIG DAY | Lodging: Lone Pine Cabins, Grand Lake
Location: Maroon Bells → Glenwood Springs → Grand Lake CO
4:40 AM – Wake up, kitchenette breakfast
5:15 AM – Drive to Aspen Highlands, 75 Boomerang Rd, Aspen CO
6:00 AM – CRITICAL: Maroon Bells Shuttle ($74 paid)
6:15 AM – Maroon Lake, Maroon Bells Scenic Area, Aspen CO
7:00 AM – Crater Lake Trail: ~6km round trip
11:00 AM – Shuttle return (first come first served)
11:45 AM – Brunch in Aspen CO
12:45 PM – Drive CO-82 North to Glenwood Springs
1:45 PM – Glenwood Springs options: A) Glenwood Hot Springs, 401 N River St, B) Canyon bike ride, C) Skip
3:30 PM – Drive I-70 → CO-9/US-40. REFUEL BEFORE KREMMLING! Grocery at City Market, 250 E Agate Ave, Granby CO
6:15 PM – Lone Pine Cabins, 416 Grand Ave, Grand Lake CO
7:00 PM – Grand Lake boardwalk + dinner
Total driving: ~5 hours
 
Day 8 – Tuesday, July 7 | Lodging: Comfort Suites DEN (#5042762440)
Location: RMNP → Estes Park → Denver
CRITICAL: Grand Lake Gate before 9:00 AM = no Timed Entry reservation needed!
6:00 AM – Wake up, breakfast, final packing
7:30 AM – Checkout (not returning!)
8:00 AM – Grand Lake Gate, Rocky Mountain National Park (must enter before 9 AM)
8:30 AM – Kawuneeche Valley, Coyote Valley Trail (moose!)
10:00 AM – Trail Ridge Road: Milner Pass, Alpine Visitor Center, elk. Don't step off tundra trails.
1:00 PM – Estes Park CO: lunch, stroll, taffy shops
2:30 PM – Drive US-36 / E-470 to Denver
4:30 PM – Comfort Suites DEN, 5940 Tower Road, Denver CO 80249. Confirm 3 AM shuttle, grab-and-go breakfast.
6:00 PM – Enterprise DEN: refuel + return vehicle by 8 PM!
8:30 PM – Very early bedtime
Total driving: ~4 hours
 
## Key Tips
- Altitude: 2,300–3,700m throughout. Drink water from day 1, watch for headaches.
- Sun: Much stronger than Georgia. SPF 50, hats, sunglasses daily.
- Afternoon storms: Finish trails by noon, don't be above tree line with lightning.
- Cold nights: 7–11°C even in July. Warm layer in daypack always.
- Key gear: Closed shoes (dunes), water shoes (Zapata/rafting/Medano), swimsuits, quick-drying clothes, headlamps.
 
## Accommodations
- The Dunes Place, 506 Mill Run Rd, Mosca CO 81146: King bed, bunk bed, single. Host Amanda. No open fires.
- Clocktower Flat, 801 Swift Cir, Buena Vista CO 81211: 2 Queens + 1 single. Manager Melissa. Shoes off, quiet 10PM-7AM.
- Tyrolean Lodge, 200 W Main St, Aspen CO: 2 Queens + Twin, kitchenette. Room 102. No smoking ($200 fine), no pets.
- Lone Pine Cabins, 416 Grand Ave, Grand Lake CO 80447: Queen + 2 sofa beds.
- Comfort Suites DEN, 5940 Tower Road, Denver CO 80249: 2 Queens + sofa bed. 3 AM shuttle arranged.
`;
 
// ── i18n strings ──────────────────────────────────────────────────────────────
const T = {
  he: {
    dir: "rtl",
    title: "עוזר הטיול – קולורדו 2026",
    subtitle: "30 יוני – 8 יולי · 8 ימים · 5 יעדים",
    updateFile: "עדכן קובץ",
    close: "סגור",
    uploadHint: "העלה קובץ טקסט מעודכן (.txt, .md, .docx)",
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
      { id: "gear",     label: "🎒 ציוד",           prompt: (days, loc) => `עבור ${days} בטיול, פרט את כל הציוד המומלץ – מחולק לקטגוריות (ביגוד, נעליים, ציוד הרים, שמש, אחר). היה ספציפי לפעילויות ולמזג האוויר.` },
      { id: "weather",  label: "🌤️ מזג אוויר",      prompt: (days, loc) => `תתאר את מזג האוויר הצפוי ב${days} – טמפרטורות בוקר/צהריים/ערב, סופות אחר צהריים, מה לצפות בגובה. כלול עצות פרקטיות.` },
      { id: "route",    label: "🗺️ מסלול ופעילויות",prompt: (days, loc) => `תאר את המסלול המלא והפעילויות ל${days} – שעה אחר שעה. כלול קישורי Google Maps לכל מיקום. ציין נקודות קריטיות.` },
      { id: "driving",  label: "🚗 זמני נסיעה",     prompt: (days, loc) => `מה זמן הנסיעה הכולל ל${days}? פרט כל קטע נסיעה, כביש, ומשך. כלול קישורי Google Maps לניווט. ציין איפה לתדלק.` },
      { id: "food",     label: "🍽️ איפה לאכול",     prompt: (days, loc) => `המלץ על מסעדות ל${days} – בוקר/צהריים/ערב, עם שמות ספציפיים, מחיר משוער, וקישורי Google Maps.` },
      { id: "shopping", label: "🛒 קניות בסופר",    prompt: (days, loc) => `עבור ${days}, מה לקנות בסופר ומתי? רשימה מפורטת עם כמויות למשפחה של 5, איזה סופר (עם קישור Google Maps).` },
    ],
    systemLang: "Hebrew",
  },
  en: {
    dir: "ltr",
    title: "Colorado 2026 · Trip Assistant",
    subtitle: "Jun 30 – Jul 8 · 8 days · 5 destinations",
    updateFile: "Update file",
    close: "Close",
    uploadHint: "Upload updated text file (.txt, .md, .docx)",
    loaded: "Currently loaded:",
    chooseFile: "Choose file from device",
    sessionOnly: "File is stored for this session only",
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
      { id: "gear",     label: "🎒 Gear",           prompt: (days) => `For ${days}, list all recommended gear by category (clothing, shoes, hiking, sun protection, other). Be specific to activities and expected weather.` },
      { id: "weather",  label: "🌤️ Weather",        prompt: (days) => `Describe expected weather for ${days} – morning/afternoon/evening temps, storm probability, altitude considerations. Include practical tips.` },
      { id: "route",    label: "🗺️ Route & Activities", prompt: (days) => `Describe the full route and activities for ${days} hour by hour. Include Google Maps links for every location. Highlight critical timing points.` },
      { id: "driving",  label: "🚗 Drive times",    prompt: (days) => `What is the total driving time for ${days}? Detail each segment, highway, and duration. Include Google Maps navigation links. Note fuel stops.` },
      { id: "food",     label: "🍽️ Where to eat",   prompt: (days) => `Recommend restaurants for ${days} – breakfast, lunch, dinner with specific names, estimated price, and Google Maps links.` },
      { id: "shopping", label: "🛒 Grocery list",   prompt: (days) => `For ${days}, what to buy at the grocery store and when? Detailed list with quantities for a family of 5, which store (with Google Maps link).` },
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
 
function buildSystemPrompt(tripDoc, lang) {
  return `You are a knowledgeable trip assistant for the Shuv family's Colorado road trip, June 30 – July 8, 2026.
 
Answer ONLY in ${lang}. Be concise and practical.
 
CRITICAL FORMATTING RULES:
- Always include Google Maps links for every location mentioned: [Place Name](https://maps.google.com/?q=URL_ENCODED_ADDRESS)
- For driving segments include navigation links: [Navigate](https://www.google.com/maps/dir/ORIGIN/DESTINATION)
- Use real addresses from the trip plan when available
- Format with clear sections, emojis, and bullet points for easy mobile reading
 
TRIP PLAN:
${tripDoc}`;
}
 
function renderMessageContent(content) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const segments = [];
  let lastIndex = 0;
  let match;
  let k = 0;
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
 
function ApiKeyScreen({ onSave, lang }) {
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const isHe = lang === "he";
 
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0b1d35 0%, #0f2d4a 40%, #0d2218 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "24px",
      direction: isHe ? "rtl" : "ltr",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "20px",
        padding: "32px 28px",
        maxWidth: "380px",
        width: "100%",
        color: "#e8f0fe",
      }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏔️</div>
          <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
            Colorado 2026
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
            {isHe
              ? "כדי להשתמש באפליקציה, הזן את מפתח ה-API של Anthropic שלך.\nהמפתח נשמר רק במכשיר זה."
              : "Enter your Anthropic API key to use the app.\nThe key is stored only on this device."}
          </div>
        </div>
 
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
            {isHe ? "Anthropic API Key" : "Anthropic API Key"}
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="sk-ant-..."
              onKeyDown={e => e.key === "Enter" && key.startsWith("sk-") && onSave(key.trim())}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "10px",
                padding: "11px 44px 11px 14px",
                color: "#e8f0fe",
                fontSize: "14px",
                outline: "none",
                fontFamily: "monospace",
                direction: "ltr",
                boxSizing: "border-box",
              }}
            />
            <button onClick={() => setShow(v => !v)} style={{
              position: "absolute", top: "50%", right: "12px",
              transform: "translateY(-50%)",
              background: "none", border: "none",
              color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "16px",
            }}>{show ? "🙈" : "👁️"}</button>
          </div>
        </div>
 
        <button
          onClick={() => key.startsWith("sk-") && onSave(key.trim())}
          disabled={!key.startsWith("sk-")}
          style={{
            width: "100%",
            background: key.startsWith("sk-")
              ? "linear-gradient(135deg, #1d6fa4, #1a5c8a)"
              : "rgba(255,255,255,0.08)",
            border: "none", borderRadius: "10px",
            padding: "12px",
            color: key.startsWith("sk-") ? "white" : "rgba(255,255,255,0.3)",
            fontSize: "14px", fontWeight: 600,
            cursor: key.startsWith("sk-") ? "pointer" : "default",
            transition: "all 0.2s",
          }}
        >
          {isHe ? "התחל →" : "Start →"}
        </button>
 
        <div style={{
          marginTop: "20px",
          padding: "12px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "10px",
          fontSize: "11px",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.7,
          direction: isHe ? "rtl" : "ltr",
        }}>
          {isHe ? (
            <>🔑 המפתח נשמר ב-localStorage של הדפדפן — לא נשלח לשום שרת חוץ מ-Anthropic ישירות.<br/>
            📋 ניתן לקבל מפתח בכתובת: </>
          ) : (
            <>🔑 Key is stored in browser localStorage — only sent directly to Anthropic.<br/>
            📋 Get a key at: </>
          )}
          <a href="https://console.anthropic.com/keys" target="_blank" rel="noopener noreferrer"
            style={{ color: "#60b4ff" }}>console.anthropic.com/keys</a>
        </div>
      </div>
    </div>
  );
}
 
export default function ColoradoAssistant() {
  const [lang, setLang] = useState("he");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("anthropic_api_key") || "");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [tripDoc, setTripDoc] = useState(DEFAULT_TRIP_DOC);
  const [docFileName, setDocFileName] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
 
  const t = T[lang];
 
  function saveApiKey(key) {
    localStorage.setItem("anthropic_api_key", key);
    setApiKey(key);
  }
 
  if (!apiKey) return <ApiKeyScreen onSave={saveApiKey} lang={lang} />;
 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
 
  function toggleDay(num) {
    setSelectedDays(prev =>
      prev.includes(num) ? prev.filter(d => d !== num) : [...prev, num].sort((a, b) => a - b)
    );
  }
 
  function toggleLang() {
    setLang(l => l === "he" ? "en" : "he");
    setMessages([]);
  }
 
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setDocFileName(file.name);
    const text = await file.text();
    setTripDoc(text);
    setShowUpload(false);
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
      return `Day ${d} (${t.dayLabels[d - 1]}, ${meta?.location})`;
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
      const response = await fetch("https://english-writer.dolevgot.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: buildSystemPrompt(tripDoc, t.systemLang),
          messages: newMessages,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const assistantText = data.content?.map(b => b.text || "").join("") || t.connError;
      setMessages(prev => [...prev, { role: "assistant", content: assistantText }]);
    } catch (err) {
      const msg = err.message?.includes("API key") || err.message?.includes("auth")
        ? (isHe ? "❌ מפתח API לא תקין. לחץ על 🔑 כדי לשנות." : "❌ Invalid API key. Tap 🔑 to change.")
        : t.connError;
      setMessages(prev => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  }
 
  function handleQueryType(qt) {
    sendMessage(qt.prompt(buildDaysStr()));
  }
 
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }
 
  const isEmpty = messages.length === 0;
  const isHe = lang === "he";
 
  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(160deg, #0b1d35 0%, #0f2d4a 40%, #0d2218 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#e8f0fe",
      direction: t.dir,
    }}>
      {/* ── Header ── */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        flexShrink: 0,
      }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontSize: "22px" }}>🏔️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.title}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>{t.subtitle}</div>
          </div>
 
          {/* API key reset */}
          <button onClick={() => { localStorage.removeItem("anthropic_api_key"); setApiKey(""); setMessages([]); }}
            title={isHe ? "החלף מפתח API" : "Change API key"}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: "8px",
              padding: "4px 8px",
              color: "rgba(255,255,255,0.45)",
              fontSize: "14px",
              cursor: "pointer",
              flexShrink: 0,
            }}>🔑</button>
 
          {/* Lang toggle */}
          <button onClick={toggleLang} style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "20px",
            padding: "4px 10px",
            color: "#e8f0fe",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.5px",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexShrink: 0,
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            {isHe ? "🇺🇸 EN" : "🇮🇱 עב"}
          </button>
 
          {/* Upload toggle */}
          <button onClick={() => setShowUpload(v => !v)} style={{
            background: showUpload ? "rgba(100,180,255,0.18)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            padding: "4px 9px",
            color: "#e8f0fe",
            fontSize: "11px",
            cursor: "pointer",
            flexShrink: 0,
          }}>
            📂 {showUpload ? t.close : t.updateFile}
          </button>
        </div>
 
        {/* Upload panel */}
        {showUpload && (
          <div style={{
            marginTop: "10px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "12px",
          }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>{t.uploadHint}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
              {t.loaded} <span style={{ color: "rgba(100,210,100,0.8)" }}>{docFileName || t.defaultDoc}</span>
            </div>
            <input ref={fileInputRef} type="file" accept=".txt,.md,.docx" onChange={handleFileUpload} style={{ display: "none" }} />
            <button onClick={() => fileInputRef.current?.click()} style={{
              background: "linear-gradient(135deg, #1d6fa4, #1a5c8a)",
              border: "none", borderRadius: "8px", padding: "8px 16px",
              color: "white", fontSize: "12px", cursor: "pointer", width: "100%",
            }}>{t.chooseFile}</button>
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
                  borderRadius: "8px", padding: "6px 4px",
                  color: sel ? "#fff" : "rgba(255,255,255,0.6)",
                  fontSize: "11px", cursor: "pointer", textAlign: "center", lineHeight: 1.3, transition: "all 0.15s",
                }}>
                  <div style={{ fontSize: "13px" }}>{day.emoji}</div>
                  <div style={{ fontWeight: 600 }}>{t.day} {day.num}</div>
                  <div style={{ fontSize: "9px", opacity: 0.7 }}>{t.dayLabels[day.num - 1]}</div>
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
              <button key={qt.id} onClick={() => handleQueryType(qt)} disabled={loading} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "7px 5px",
                color: loading ? "rgba(255,255,255,0.25)" : "#e8f0fe",
                fontSize: "11px", cursor: loading ? "default" : "pointer",
                textAlign: "center", transition: "all 0.15s",
              }}
                onMouseEnter={e => !loading && (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >{qt.label}</button>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "16px",
        display: "flex", flexDirection: "column", gap: "10px",
      }}>
        {isEmpty && (
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
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.5)",
                  animation: "bounce 1.2s ease-in-out infinite",
                  animationDelay: `${j * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
 
      {/* ── Input ── */}
      <div style={{
        padding: "10px 14px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex", gap: "8px", alignItems: "flex-end",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.13)",
          borderRadius: "12px",
          padding: isHe ? "7px 7px 7px 12px" : "7px 12px 7px 7px",
          flexDirection: isHe ? "row-reverse" : "row",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t.placeholder}
            rows={1}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#e8f0fe", fontSize: "13px", resize: "none", lineHeight: 1.5,
              maxHeight: "80px", overflowY: "auto",
              direction: isHe ? "rtl" : "ltr",
              textAlign: isHe ? "right" : "left",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              background: input.trim() && !loading ? "linear-gradient(135deg, #1d6fa4, #1a5c8a)" : "rgba(255,255,255,0.08)",
              border: "none", borderRadius: "8px", width: "32px", height: "32px",
              cursor: input.trim() && !loading ? "pointer" : "default",
              color: "white", fontSize: "15px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "all 0.2s",
            }}
          >↑</button>
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
