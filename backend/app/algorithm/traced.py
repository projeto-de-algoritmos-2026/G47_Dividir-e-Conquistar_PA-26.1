"""Seleção pela mediana das medianas com registro dos passos."""

from .groups import split_into_groups
from .median import median_of_group
from .partition import partition_three_way
from .trace import Step


def select_kth_traced(values: list[int], k: int) -> tuple[int, list[Step]]:
    """Executa a seleção e devolve (resultado, passos da execução)."""
    steps: list[Step] = []
    result = _select(values, k, steps)
    return result, steps


def _select(values: list[int], k: int, steps: list[Step]) -> int:
    if len(values) == 1:
        steps.append(Step(
            phase="base",
            values=list(values),
            k=k,
            description=f"Subvetor com um único elemento: {values[0]}.",
        ))
        return values[0]

    groups = split_into_groups(values)
    steps.append(Step(
        phase="groups",
        values=list(values),
        groups=groups,
        k=k,
        description=f"Divide o vetor em {len(groups)} grupos de até 5 elementos.",
    ))

    medians = [median_of_group(group) for group in groups]
    steps.append(Step(
        phase="medians",
        values=list(values),
        groups=groups,
        medians=medians,
        k=k,
        description="Calcula a mediana de cada grupo.",
    ))

    pivot = _select(medians, (len(medians) + 1) // 2, steps)
    steps.append(Step(
        phase="pivot",
        values=list(values),
        pivot=pivot,
        k=k,
        description=f"Pivô escolhido (mediana das medianas): {pivot}.",
    ))

    less, equal, greater = partition_three_way(values, pivot)
    steps.append(Step(
        phase="partition",
        values=list(values),
        pivot=pivot,
        less=less,
        equal=equal,
        greater=greater,
        k=k,
        description=f"Particiona: {len(less)} menores, {len(equal)} iguais, {len(greater)} maiores.",
    ))

    if k <= len(less):
        return _select(less, k, steps)
    if k <= len(less) + len(equal):
        steps.append(Step(
            phase="found",
            values=list(values),
            pivot=pivot,
            k=k,
            description=f"O {k}º menor elemento é o pivô: {pivot}.",
        ))
        return pivot
    return _select(greater, k - len(less) - len(equal), steps)
