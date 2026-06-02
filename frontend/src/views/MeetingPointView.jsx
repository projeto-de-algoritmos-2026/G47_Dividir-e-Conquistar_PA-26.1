import { useEffect, useState } from "react";
import { requestMeetingPoint, requestMeetingPointFor } from "../api.js";
import CityMap from "../components/CityMap.jsx";

export default function MeetingPointView() {
  const [points, setPoints] = useState([]);
  const [optimal, setOptimal] = useState(null);
  const [error, setError] = useState("");

  function loadBase() {
    requestMeetingPoint()
      .then((data) => {
        setPoints(data.cities);
        setOptimal({ lon: data.lon, lat: data.lat, total_distance: data.total_distance });
      })
      .catch((err) => setError(err.message));
  }

  useEffect(loadBase, []);

  async function recalc(next) {
    setPoints(next);
    if (next.length === 0) {
      setOptimal(null);
      return;
    }
    try {
      const data = await requestMeetingPointFor(next);
      setOptimal({ lon: data.lon, lat: data.lat, total_distance: data.total_distance });
    } catch (err) {
      setError(err.message);
    }
  }

  function addPoint({ lon, lat }) {
    recalc([...points, { name: `P${points.length + 1}`, lon, lat }]);
  }

  return (
    <>
      <p className="subtitle">
        A mediana minimiza a distância total — clique no mapa para escolher os pontos
        e ver o ponto de encontro recalculado.
      </p>

      {error && <p className="error">⚠ {error}</p>}

      <div className="form-actions">
        <button type="button" onClick={() => recalc([])}>
          Limpar pontos
        </button>
        <button type="button" onClick={loadBase}>
          Restaurar capitais
        </button>
      </div>

      <CityMap cities={points} optimal={optimal} onPick={addPoint} />

      <p className="hint">
        🖱️ Cada clique adiciona um ponto. {points.length} ponto(s) no mapa.
      </p>

      {optimal && (
        <p className="verdict">
          Ponto de encontro ótimo:{" "}
          <strong>
            ({optimal.lon.toFixed(2)}, {optimal.lat.toFixed(2)})
          </strong>{" "}
          — distância total mínima de{" "}
          <strong>{optimal.total_distance.toFixed(1)}</strong> (Manhattan), pela{" "}
          <strong>mediana</strong> das longitudes e latitudes via mediana das medianas.
        </p>
      )}
    </>
  );
}
