export default function Controls({
  arrayText,
  onArrayText,
  k,
  onK,
  onRun,
  onRandom,
  loading,
  hasSteps,
  stepIndex,
  totalSteps,
  playing,
  onPrev,
  onNext,
  onPlay,
}) {
  return (
    <div className="controls">
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          onRun();
        }}
      >
        <label>
          Vetor (vazio = aleatório)
          <input
            type="text"
            value={arrayText}
            placeholder="ex.: 7, 3, 9, 1, 5"
            onChange={(event) => onArrayText(event.target.value)}
          />
        </label>
        <label>
          k (k-ésimo menor)
          <input
            type="number"
            min="1"
            value={k}
            onChange={(event) => onK(event.target.value)}
          />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Executando…" : "Executar"}
          </button>
          <button type="button" onClick={onRandom} disabled={loading}>
            Vetor aleatório
          </button>
        </div>
      </form>

      {hasSteps && (
        <div className="player">
          <button type="button" onClick={onPrev} disabled={stepIndex === 0}>
            ◀ Anterior
          </button>
          <button type="button" onClick={onPlay}>
            {playing ? "⏸ Pausar" : "▶ Reproduzir"}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={stepIndex >= totalSteps - 1}
          >
            Próximo ▶
          </button>
          <span className="counter">
            Passo {stepIndex + 1} / {totalSteps}
          </span>
        </div>
      )}
    </div>
  );
}
