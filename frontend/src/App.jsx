import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setOnline(data.status === "ok"))
      .catch(() => setOnline(false));
  }, []);

  return (
    <main className="app">
      <h1>Mediana das Medianas</h1>
      <p className="subtitle">Demonstração visual do algoritmo de Dividir e Conquistar.</p>
      <p className="status">
        API:{" "}
        {online === null ? "verificando…" : online ? "conectada ✅" : "offline ❌"}
      </p>
    </main>
  );
}
