"""Seleção do k-ésimo menor elemento pela mediana das medianas."""

from .groups import split_into_groups
from .median import median_of_group
from .partition import partition_three_way


def select_kth(values: list[int], k: int) -> int:
    """Retorna o k-ésimo menor elemento de ``values`` (k começa em 1)."""
    if len(values) == 1:
        return values[0]

    medians = [median_of_group(group) for group in split_into_groups(values)]
    # Pivô: mediana das medianas, obtida pela própria seleção recursiva.
    pivot = select_kth(medians, (len(medians) + 1) // 2)

    less, equal, greater = partition_three_way(values, pivot)

    if k <= len(less):
        return select_kth(less, k)
    if k <= len(less) + len(equal):
        return pivot
    return select_kth(greater, k - len(less) - len(equal))
