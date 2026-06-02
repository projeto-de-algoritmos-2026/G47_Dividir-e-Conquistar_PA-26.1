import { useEffect, useRef, useState } from "react";
import { requestSelection } from "../api.js";
import ArrayBars from "../components/ArrayBars.jsx";
import Controls from "../components/Controls.jsx";
import StepInfo from "../components/StepInfo.jsx";

function parseArray(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return trimmed
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number);
}

export default function AlgorithmView() {
  const [arrayText, setArrayText] = useState("");
  const [k, setK] = useState("5");
  const [data, setData] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef(null);

  async function run(values) {
    setLoading(true);
    setError("");
    setPlaying(false);
    try {
      const result = await requestSelection(values, Number(k));
      setData(result);
      setStepIndex(0);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const steps = data?.steps ?? [];

  useEffect(() => {
    if (!playing) return undefined;
    timer.current = setInterval(() => {
      setStepIndex((index) => {
        if (index >= steps.length - 1) {
          setPlaying(false);
          return index;
        }
        return index + 1;
      });
    }, 1200);
    return () => clearInterval(timer.current);
  }, [playing, steps.length]);

  const currentStep = steps[stepIndex];

  return (
    <>
      <p className="subtitle">
        Seleção determinística do k-ésimo menor elemento por Dividir e Conquistar.
      </p>

      <Controls
        arrayText={arrayText}
        onArrayText={setArrayText}
        k={k}
        onK={setK}
        onRun={() => run(parseArray(arrayText))}
        onRandom={() => {
          setArrayText("");
          run(null);
        }}
        loading={loading}
        hasSteps={steps.length > 0}
        stepIndex={stepIndex}
        totalSteps={steps.length}
        playing={playing}
        onPrev={() => setStepIndex((i) => Math.max(0, i - 1))}
        onNext={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
        onPlay={() => setPlaying((p) => !p)}
      />

      {error && <p className="error">⚠ {error}</p>}

      {currentStep && (
        <section className="stage">
          <p className="phase">
            <strong>{currentStep.phase}</strong> — {currentStep.description}
          </p>
          <StepInfo step={currentStep} />
          <ArrayBars step={currentStep} />
          {data && stepIndex === steps.length - 1 && (
            <p className="result">
              {data.k}º menor elemento = <strong>{data.result}</strong>
            </p>
          )}
        </section>
      )}
    </>
  );
}
