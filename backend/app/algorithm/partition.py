"""Particionamento de um vetor em torno de um pivô."""


def partition_three_way(values: list[int], pivot: int) -> tuple[list[int], list[int], list[int]]:
    """Divide ``values`` em (menores, iguais, maiores) em relação ao ``pivot``."""
    less: list[int] = []
    equal: list[int] = []
    greater: list[int] = []

    for value in values:
        if value < pivot:
            less.append(value)
        elif value > pivot:
            greater.append(value)
        else:
            equal.append(value)

    return less, equal, greater
