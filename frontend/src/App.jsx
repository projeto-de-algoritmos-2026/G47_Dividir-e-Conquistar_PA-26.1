import { useState } from "react";
import AlgorithmView from "./views/AlgorithmView.jsx";
import MeetingPointView from "./views/MeetingPointView.jsx";

const TABS = [
  { id: "algoritmo", label: "Algoritmo" },
  { id: "encontro", label: "Ponto de encontro" },
];

export default function App() {
  const [tab, setTab] = useState("algoritmo");

  return (
    <main className="app">
      <h1>Mediana das Medianas</h1>

      <nav className="tabs">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? "tab active" : "tab"}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "algoritmo" ? <AlgorithmView /> : <MeetingPointView />}
    </main>
  );
}
