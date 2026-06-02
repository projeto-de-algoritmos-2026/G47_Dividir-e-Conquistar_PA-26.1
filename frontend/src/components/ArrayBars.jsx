const GROUP_SIZE = 5;

// Classifica cada barra do passo atual para colori-la conforme a fase.
function barClass(step, value, index) {
  const group = Math.floor(index / GROUP_SIZE);
  switch (step.phase) {
    case "groups":
      return group % 2 === 0 ? "bar group-a" : "bar group-b";
    case "medians":
      return value === step.medians?.[group] ? "bar median" : "bar dim";
    case "pivot":
    case "found":
      return value === step.pivot ? "bar pivot" : "bar dim";
    case "partition":
      if (value < step.pivot) return "bar less";
      if (value > step.pivot) return "bar greater";
      return "bar equal";
    default:
      return "bar base";
  }
}

export default function ArrayBars({ step }) {
  const max = Math.max(...step.values, 1);
  return (
    <div className="bars">
      {step.values.map((value, index) => (
        <div
          key={index}
          className={barClass(step, value, index)}
          style={{ height: `${(value / max) * 100}%` }}
          title={String(value)}
        >
          <span className="bar-label">{value}</span>
        </div>
      ))}
    </div>
  );
}
