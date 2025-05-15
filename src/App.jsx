import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

/* ---------- COLOUR MAPS ---------- */
const priorityColors = {
  high:   { bg: "#dc2626", text: "#fff", border: "#dc2626" },
  medium: { bg: "#ca8a04", text: "#fff", border: "#ca8a04" },
  low:    { bg: "#16a34a", text: "#fff", border: "#16a34a" }
};
const categoryColors = {
  general:  { bg: "#9ca3af", text: "#fff", border: "#9ca3af" },
  work:     { bg: "#2563eb", text: "#fff", border: "#2563eb" },
  personal: { bg: "#ea580c", text: "#fff", border: "#ea580c" },
  shopping: { bg: "#10b981", text: "#fff", border: "#10b981" }
};

/* ---------- MOTIVATIONAL QUOTES BASED ON MOOD ---------- */
const moodQuotes = {
  happy: [
    "Keep spreading that joy!",
    "Happiness is contagious — share it!",
    "Your smile lights up the day."
  ],
  sad: [
    "It's okay to feel down. Better days are coming.",
    "Every storm runs out of rain.",
    "You're stronger than you think."
  ],
  neutral: [
    "Balance is the key to everything.",
    "Stay steady, keep going.",
    "One step at a time."
  ],
  excited: [
    "Use that energy to chase your dreams!",
    "You're unstoppable today!",
    "Let the excitement fuel your purpose!"
  ],
  tired: [
    "Rest if you must, but don't quit.",
    "Even small steps matter.",
    "You're doing great—keep going."
  ]
};

function App() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [date, setDate] = useState("");                      /* 🆕 */
  const [categories, setCategories] = useState(["general", "work", "personal", "shopping"]);
  const [activeCat, setActiveCat] = useState("general");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [mode, setMode] = useState("light");
  const [newCatName, setNewCatName] = useState("");
  const [mood, setMood] = useState("happy");
  const [quote, setQuote] = useState("");

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    const savedMode = localStorage.getItem("mode");
    const storedCats = localStorage.getItem("categories");
    const savedMood = localStorage.getItem("mood");

    if (stored) setTodos(JSON.parse(stored));
    if (savedMode) setMode(savedMode);
    if (storedCats) setCategories(JSON.parse(storedCats));
    if (savedMood) setMood(savedMood);
  }, []);

  useEffect(() => localStorage.setItem("todos", JSON.stringify(todos)), [todos]);
  useEffect(() => localStorage.setItem("mode", mode), [mode]);
  useEffect(() => localStorage.setItem("categories", JSON.stringify(categories)), [categories]);

  useEffect(() => {
    localStorage.setItem("mood", mood);
    const quotes = moodQuotes[mood] || [];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [mood]);

  /* ---------- HELPERS ---------- */
  const addTodo = () => {
    if (todo.trim().length < 3) return;
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
        priority,
        category: activeCat,
        date: date || new Date().toISOString().split("T")[0]   /* 🆕 save date */
      }
    ]);
    setTodo("");
    setPriority("medium");
    setDate("");                                              /* 🆕 reset picker */
  };

  const editTodo = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    setPriority(t.priority);
    setDate(t.date || "");
    setTodos(todos.filter((i) => i.id !== id));
  };

  const deleteTodo = (id) => setTodos(todos.filter((i) => i.id !== id));
  const toggleDone  = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));

  const addCategory = () => {
    const name = newCatName.trim().toLowerCase();
    if (!name || categories.includes(name)) return;
    setCategories([...categories, name]);
    setActiveCat(name);
    setNewCatName("");
  };

  const list = todos.filter(
    (t) => (showFinished || !t.isCompleted) && t.category === activeCat
  );

  const moodIcons = { happy:"😄", sad:"😢", neutral:"😐", excited:"🤩", tired:"😴" };

  /* ---------- RENDER ---------- */
  return (
    <div className={`min-h-screen flex flex-col ${mode === "dark" ? "bg-rose-900" : "bg-gray-100"}`}>
      <Navbar />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-48 bg-white border-r border-rose-300 p-4">
          <h3 className="font-bold text-lg mb-4 text-rose-400">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCat(cat)}
                  className={`w-full text-left px-3 py-1 rounded-lg capitalize ${
                    activeCat === cat ? "bg-pink-200 text-rose-800 font-semibold" : "hover:bg-pink-100"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="New category"
              className="w-full px-2 py-1 text-sm border rounded"
            />
            <button
              onClick={addCategory}
              className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white text-sm rounded py-1"
            >
              Add
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <main
          className={`flex-grow mx-3 md:mx-auto my-5 p-5 rounded-xl md:w-[35%] transition-colors duration-500 ${
            mode === "dark" ? "bg-rose-800 text-rose-300" : "bg-pink-100 text-rose-400"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-extrabold text-3xl font-ab flex items-center gap-2">
              {mode === "dark" ? "🌙" : "☀️"} {activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}
              <span title={`Mood: ${mood}`} className="text-2xl">{moodIcons[mood]}</span>
            </h1>
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`rounded-full px-3 py-1 text-sm font-bold transition-colors ${
                mode === "dark" ? "bg-rose-300 text-rose-800" : "bg-rose-800 text-rose-200"
              }`}
            >
              {mode === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mood Quote Display */}
          <div className="italic text-sm text-center mb-4">
            {quote && (
              <p>
                💡 <span className="text-rose-500 font-semibold">Motivation:</span> "{quote}"
              </p>
            )}
          </div>

          {/* Add Todo */}
          <div className="flex flex-col gap-4 mb-6">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder={`Add a task to ${activeCat}`}
              className="w-full rounded-full px-5 py-1 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />

            {/* 🆕 Date picker */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-full px-5 py-1 text-rose-700 border border-rose-300 focus:outline-none"
            />

            <div className="flex gap-3 justify-center">
              {["high", "medium", "low"].map((lvl) => {
                const sel = priority === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setPriority(lvl)}
                    style={{
                      backgroundColor: sel ? priorityColors[lvl].bg : "transparent",
                      color: sel ? priorityColors[lvl].text : priorityColors[lvl].border,
                      borderColor: sel ? "transparent" : priorityColors[lvl].border
                    }}
                    className="text-sm font-semibold px-3 py-1.5 border-2 rounded-full transition-all hover:bg-opacity-20"
                  >
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              {Object.keys(moodIcons).map((m) => {
                const selected = mood === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`text-sm font-semibold px-3 py-1.5 border-2 rounded-full transition-all hover:bg-pink-300 flex items-center gap-1 ${
                      selected ? "bg-pink-500 text-white border-pink-500" : "border-pink-500 text-pink-500"
                    }`}
                    title={`Set mood: ${m}`}
                  >
                    <span className="text-lg">{moodIcons[m]}</span> {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                );
              })}
            </div>

            <button
              onClick={addTodo}
              disabled={todo.trim().length <= 3}
              className="bg-pink-500 w-1/3 mx-auto rounded-full text-white text-sm py-2 hover:bg-pink-700 disabled:opacity-60"
            >
              Save
            </button>
          </div>

          {/* Show Finished Checkbox */}
          <div className="flex items-center mb-3">
            <input
              id="show"
              type="checkbox"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
              className="mr-2"
            />
            <label htmlFor="show" className="select-none">Show Finished</label>
          </div>

          <div className="h-[1px] bg-black opacity-15 w-full my-2"></div>

          {/* Task List */}
          <ul>
            {list.length === 0 && <p className="text-center text-rose-500 italic">No tasks</p>}
            {list.map(({ id, todo, isCompleted, priority, date }) => (
              <li
                key={id}
                className={`flex gap-2 items-center rounded-lg p-2 mb-2 border border-rose-400 ${
                  isCompleted ? "line-through opacity-70" : ""
                }`}
                style={{
                  backgroundColor: isCompleted ? "transparent" : priorityColors[priority].bg,
                  color: isCompleted ? "inherit" : priorityColors[priority].text
                }}
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleDone(id)}
                  className="w-5 h-5"
                />
                <span className="flex-grow">
                  {todo}
                  {/* 🆕 show date */}
                  <span className="block text-xs opacity-70">
                    {new Date(date).toLocaleDateString()}
                  </span>
                </span>
                <button onClick={() => editTodo(id)} className="hover:text-rose-800" title="Edit">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTodo(id)} className="hover:text-rose-800" title="Delete">
                  <AiFillDelete />
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
