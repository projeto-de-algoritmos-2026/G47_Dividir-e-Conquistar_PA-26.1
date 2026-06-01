"""Divisão do vetor em grupos para a mediana das medianas."""

GROUP_SIZE = 5


def split_into_groups(values: list[int]) -> list[list[int]]:
    """Quebra values em grupos de até GROUP_SIZE elementos."""
    return [values[i:i + GROUP_SIZE] for i in range(0, len(values), GROUP_SIZE)]
