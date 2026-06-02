const API_URL = "http://127.0.0.1:8000";

export async function requestSelection(values, k) {
  const res = await fetch(`${API_URL}/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, k }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Falha ao consultar a API.");
  }
  return res.json();
}

export async function requestMeetingPoint() {
  const res = await fetch(`${API_URL}/meeting-point`);
  if (!res.ok) throw new Error("Falha ao carregar o ponto de encontro.");
  return res.json();
}

export async function requestMeetingPointFor(points) {
  const res = await fetch(`${API_URL}/meeting-point`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points }),
  });
  if (!res.ok) throw new Error("Falha ao recalcular o ponto de encontro.");
  return res.json();
}
