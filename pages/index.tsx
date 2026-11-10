import { useState } from "react";
import { MessageSquare, Phone, Globe, ShieldCheck, Database, RefreshCw, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("whatsapp");
  
  // State for WhatsApp & Social Enricher
  const [phone, setPhone] = useState("+14155552671");
  const [apiKey, setApiKey] = useState("4d24805173msh8bacb8c70b79406p156f40jsn9c2371036339");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // State for AI Assistant / Chat
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Hello! I am your 24KGAL AI assistant powered by your tools suite. How can I help you today?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleEnrich = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, apiKey }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message || "Failed to fetch enrichment data." });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer || "No response." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Error connecting to AI chat service." }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0e1424] px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold text-xl shadow-md">24K</div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">24KGAL TooLs</h1>
            <p className="text-xs text-gray-400">AI Marketing, WhatsApp & OSINT Intelligence Suite</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 mr-1.5 bg-emerald-400 rounded-full animate-pulse"></span> RapidAPI Connected
          </span>
          <a
            href="https://24kgaltools.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
          >
            Blog Home ↗
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-[#0b101d] p-4 flex flex-col justify-between">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "whatsapp"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
              }`}
            >
              <Phone className="w-5 h-5" />
              <span>Phone & WhatsApp OSINT</span>
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "chat"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>AI Business Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab("workflows")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "workflows"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
              }`}
            >
              <Database className="w-5 h-5" />
              <span>n8n Workflows & Sheets</span>
            </button>
          </nav>

          <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-1">System Status</p>
            <div className="flex items-center justify-between">
              <span>RapidAPI Key:</span>
              <span className="text-emerald-400 font-mono">Active</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === "whatsapp" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Phone Number & WhatsApp OSINT Enricher</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Validate phone numbers, check WhatsApp status, and discover connected social profiles via RapidAPI.
                </p>
              </div>

              <div className="bg-[#0e1424] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4">
                <form onSubmit={handleEnrich} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                      Phone Number (E.164 format)
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+14155552671"
                      className="w-full bg-[#090d16] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                      RapidAPI Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-[#090d16] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Enriching Number...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Run OSINT Enrichment</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {result && (
                <div className="bg-[#0e1424] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Enrichment Results</span>
                  </h3>
                  <pre className="bg-[#090d16] p-4 rounded-xl text-xs font-mono overflow-x-auto text-emerald-300 border border-gray-800">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === "chat" && (
            <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-[#0e1424] rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-800 bg-[#0b101d] flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <h2 className="font-semibold text-sm">24KGAL AI Business & Marketing Assistant</h2>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                        m.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-[#0b101d] flex space-x-3">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask about AI marketing, lead generation, or business automation..."
                  className="flex-1 bg-[#090d16] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 px-5 rounded-xl text-white flex items-center justify-center transition shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {activeTab === "workflows" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">n8n Workflows & Google Sheets Automation</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Ready-to-use n8n workflow schemas and Python batch enrichment scripts for CRM and Google Sheets sync.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0e1424] p-6 rounded-2xl border border-gray-800 space-y-4">
                  <h3 className="font-semibold text-lg text-indigo-400">Google Sheets Batch Enricher</h3>
                  <p className="text-xs text-gray-400">
                    Python script reading leads from Google Sheets, checking WhatsApp validity via RapidAPI, and writing status back.
                  </p>
                  <a
                    href="https://github.com/the24kgal/medical-3d-viewer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-800 hover:bg-gray-700 text-xs px-4 py-2 rounded-lg font-medium transition"
                  >
                    View Source on GitHub ↗
                  </a>
                </div>

                <div className="bg-[#0e1424] p-6 rounded-2xl border border-gray-800 space-y-4">
                  <h3 className="font-semibold text-lg text-emerald-400">n8n Workflow JSON</h3>
                  <p className="text-xs text-gray-400">
                    Visual workflow JSON for automated webhook triggers, phone validation, and database updates.
                  </p>
                  <a
                    href="https://github.com/the24kgal/medical-3d-viewer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-800 hover:bg-gray-700 text-xs px-4 py-2 rounded-lg font-medium transition"
                  >
                    Download Workflow JSON ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
