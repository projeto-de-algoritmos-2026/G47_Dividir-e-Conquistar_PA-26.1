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
