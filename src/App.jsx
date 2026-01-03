import { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>My First React App</h1>
      <p>Built with Vite + React</p>

      <hr />

      <h2>Counter</h2>
      <p>Count: <b>{count}</b></p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)} style={{ marginLeft: 8 }}>
        -1
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>

      <hr style={{ margin: "24px 0" }} />

      <h2>Greeting</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
        style={{ padding: 8, width: "100%", boxSizing: "border-box" }}
      />
      <p style={{ marginTop: 12 }}>
        {name ? `Hello, ${name}! 👋` : "Say hi by typing your name above."}
      </p>
    </div>
  );
}
