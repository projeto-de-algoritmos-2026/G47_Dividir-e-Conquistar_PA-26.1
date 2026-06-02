import { BRAZIL_OUTLINE } from "../data/brazilOutline.js";

const W = 600;
const H = 600;
const PAD = 50;

// Projeção fixa (caixa do Brasil) para os pontos não se moverem ao mudar o conjunto.
const MIN_LON = -74;
const MAX_LON = -34;
const MIN_LAT = -34;
const MAX_LAT = 6;

const x = (lon) => PAD + ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * (W - 2 * PAD);
const y = (lat) => H - PAD - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * (H - 2 * PAD);
const toLon = (sx) => MIN_LON + ((sx - PAD) / (W - 2 * PAD)) * (MAX_LON - MIN_LON);
const toLat = (sy) => MIN_LAT + ((H - PAD - sy) / (H - 2 * PAD)) * (MAX_LAT - MIN_LAT);

const OUTLINE_PATH =
  "M " +
  BRAZIL_OUTLINE.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(" L ") +
  " Z";

export default function CityMap({ cities, optimal, onPick }) {
  function handleClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const sx = ((event.clientX - rect.left) / rect.width) * W;
    const sy = ((event.clientY - rect.top) / rect.height) * H;
    onPick({ lon: toLon(sx), lat: toLat(sy) });
  }

  return (
    <svg className="map" viewBox={`0 0 ${W} ${H}`} role="img" onClick={handleClick}>
      <path className="brazil" d={OUTLINE_PATH} />

      {optimal &&
        cities.map((city) => (
          <line
            key={`l-${city.name}`}
            className="link"
            x1={x(city.lon)}
            y1={y(city.lat)}
            x2={x(optimal.lon)}
            y2={y(optimal.lat)}
          />
        ))}

      {cities.map((city) => (
        <g key={city.name}>
          <circle className="city-dot" cx={x(city.lon)} cy={y(city.lat)} r="5" />
          <text className="city-label" x={x(city.lon) + 8} y={y(city.lat) + 4}>
            {city.name}
          </text>
        </g>
      ))}

      {optimal && (
        <>
          <circle className="optimal-dot" cx={x(optimal.lon)} cy={y(optimal.lat)} r="9" />
          <text className="optimal-label" x={x(optimal.lon) + 12} y={y(optimal.lat) - 10}>
            ótimo
          </text>
        </>
      )}
    </svg>
  );
}
