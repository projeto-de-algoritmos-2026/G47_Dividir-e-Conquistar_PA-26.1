"""Seleção pela mediana das medianas com registro dos passos."""

from .groups import split_into_groups
from .median import median_of_group
from .partition import partition_three_way
from .trace import Step


def select_kth_traced(values: list[int], k: int) -> tuple[int, list[Step]]:
    """Executa a seleção e devolve (resultado, passos da execução)."""
    steps: list[Step] = []
    result = _select(values, k, steps, depth=0, reason="inicial")
    return result, steps


def _select(values: list[int], k: int, steps: list[Step], depth: int, reason: str) -> int:
    def record(phase: str, description: str, **fields) -> None:
        steps.append(Step(
            phase=phase,
            values=list(values),
            description=description,
            depth=depth,
            reason=reason,
            k=k,
            **fields,
        ))

    if len(values) == 1:
        record("base", f"Subvetor com um único elemento: {values[0]}.")
        return values[0]

    groups = split_into_groups(values)
    record("groups", f"Divide o vetor em {len(groups)} grupos de até 5 elementos.", groups=groups)

    medians = [median_of_group(group) for group in groups]
    record("medians", "Calcula a mediana de cada grupo.", groups=groups, medians=medians)

    pivot = _select(medians, (len(medians) + 1) // 2, steps, depth + 1, "pivo")
    record("pivot", f"Pivô escolhido (mediana das medianas): {pivot}.", pivot=pivot)

    less, equal, greater = partition_three_way(values, pivot)
    record(
        "partition",
        f"Particiona: {len(less)} menores, {len(equal)} iguais, {len(greater)} maiores.",
        pivot=pivot,
        less=less,
        equal=equal,
        greater=greater,
    )

    if k <= len(less):
        return _select(less, k, steps, depth + 1, "menores")
    if k <= len(less) + len(equal):
        record("found", f"O {k}º menor elemento é o pivô: {pivot}.", pivot=pivot)
        return pivot
    remaining = k - len(less) - len(equal)
    return _select(greater, remaining, steps, depth + 1, "maiores")
