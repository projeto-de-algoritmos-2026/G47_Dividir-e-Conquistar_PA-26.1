"""Mediana de um grupo pequeno."""


def median_of_group(group: list[int]) -> int:
    """Devolve a mediana de um grupo ordenando-o (grupos têm até 5 elementos)."""
    ordered = sorted(group)
    return ordered[len(ordered) // 2]
