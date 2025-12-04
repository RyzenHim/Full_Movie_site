import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaTrash, FaSun, FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToWatchlist } from "../../redux/watchlistSlice";
import ChatMessage from "./ChatMessage";
import getBotUltimateResponse from "../../utils/getBotUltimateResponse";

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", type: "text", text: "Hi! I’m your Movie Assistant 🤖🎬 Ask me anything about movies." },
    ]);
    const [input, setInput] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [chatTheme, setChatTheme] = useState("dark");

    const lastMovieRef = useRef(null);
    const lastGenreRef = useRef(null);
    const endRef = useRef(null);

    const dispatch = useDispatch();

    const apiState = useSelector((state) => state.moviesApi);
    const allMovies = Object.values(apiState.queries || {}).flatMap((q) => q?.data || []);

    useEffect(() => {
        const saved = localStorage.getItem("movie_chat_history");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            } catch (e) {
                console.error("Failed to parse chat history:", e);
            }
        }

        const savedTheme = localStorage.getItem("movie_chat_theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            setChatTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("movie_chat_history", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem("movie_chat_theme", chatTheme);
    }, [chatTheme]);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isBotTyping, open]);

    const clearChat = () => {
        setMessages([{ from: "bot", type: "text", text: "Chat cleared. Ask me again! 😊" }]);
        lastMovieRef.current = null;
        lastGenreRef.current = null;
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const text = input;
        const userMsg = { from: "user", type: "text", text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        if (!allMovies.length) {
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    type: "text",
                    text: "I don't see any movies loaded yet. Open the home page so I can access the movie list.",
                },
            ]);
            return;
        }

        setIsBotTyping(true);

        setTimeout(() => {
            const { blocks, lastMovie, lastGenre } = getBotUltimateResponse(
                text,
                allMovies,
                lastMovieRef.current,
                lastGenreRef.current
            );

            if (lastMovie) lastMovieRef.current = lastMovie;
            if (lastGenre) lastGenreRef.current = lastGenre;

            setMessages((prev) => [...prev, ...blocks]);
            setIsBotTyping(false);
        }, 700);
    };

    const containerThemeClasses =
        chatTheme === "dark"
            ? "bg-black/70 border-white/20 text-white"
            : "bg-white/95 border-gray-300 text-gray-900";

    const inputThemeClasses =
        chatTheme === "dark"
            ? "bg-black/40 border-white/20 text-white placeholder-gray-400"
            : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500";

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl flex items-center justify-center"
                >
                    <FaRobot className="text-white text-3xl" />
                </button>
            )}

            {open && (
                <div
                    className={`
            w-[380px] h-[550px]
            ${containerThemeClasses}
            backdrop-blur-2xl rounded-3xl shadow-2xl p-4
            flex flex-col animate-slideUp
          `}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FaRobot />
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Movie Assistant</span>
                                <span className="text-xs opacity-70">Ask about movies, genres & recommendations</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setChatTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                                className="p-2 rounded-full border border-white/20"
                            >
                                {chatTheme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
                            </button>

                            <button onClick={clearChat} className="p-2 rounded-full border border-red-400/50">
                                <FaTrash className="text-red-400" />
                            </button>

                            <button onClick={() => setOpen(false)} className="p-2 rounded-full border border-white/20">
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                        {messages.map((msg, i) => (
                            <ChatMessage
                                key={i}
                                msg={msg}
                                theme={chatTheme}
                                onAddToWatchlist={(m) => dispatch(addToWatchlist(m))}
                            />
                        ))}

                        {isBotTyping && (
                            <div className="text-xs italic opacity-70">{chatTheme === "dark" ? "Assistant is typing..." : "Assistant is typing..."}</div>
                        )}

                        <div ref={endRef} />
                    </div>

                    <div className="flex gap-2 mt-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask something like: Top rated action movies"
                            className={`flex-1 px-3 py-2 rounded-xl border text-sm outline-none ${inputThemeClasses}`}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
