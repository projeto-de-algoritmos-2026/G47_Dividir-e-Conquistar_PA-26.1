const REASON_LABELS = {
  pivo: "escolhendo o pivô — mediana das medianas desta sublista",
  menores: "refinando entre os menores que o pivô",
  maiores: "refinando entre os maiores que o pivô",
};

function PartitionVerdict({ step }) {
  const lessCount = step.less.length;
  const equalCount = step.equal.length;
  const start = lessCount + 1;
  const end = lessCount + equalCount;
  const range = start === end ? `${start}` : `${start}–${end}`;
  const k = step.k;

  let verdict;
  if (k < start) {
    verdict = `Você busca k=${k}, que é menor que ${start} → a resposta está à esquerda (menores). O pivô era grande demais.`;
  } else if (k <= end) {
    verdict = `Você busca k=${k}, que cai dentro de ${range} → o pivô ${step.pivot} É a resposta.`;
  } else {
    verdict = `Você busca k=${k}, que é maior que ${end} → a resposta está à direita (maiores). O pivô era pequeno demais.`;
  }

  return (
    <p className="verdict">
      O pivô <strong>{step.pivot}</strong> tem {lessCount} elementos menores, logo ocupa
      a(s) posição(ões) <strong>{range}</strong>. {verdict}
    </p>
  );
}

export default function StepInfo({ step }) {
  return (
    <>
      {step.reason !== "inicial" && (
        <p className="recursion" style={{ marginLeft: `${step.depth * 18}px` }}>
          ↳ Recursão (nível {step.depth}) — {REASON_LABELS[step.reason] ?? step.reason}
        </p>
      )}
      {step.phase === "partition" && <PartitionVerdict step={step} />}
    </>
  );
}
