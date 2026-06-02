"""Modelo de um passo da execução, usado pela visualização."""

from dataclasses import dataclass


@dataclass
class Step:
    """Estado de uma etapa da mediana das medianas."""

    phase: str
    values: list[int]
    description: str
    depth: int = 0
    reason: str = "inicial"
    groups: list[list[int]] | None = None
    medians: list[int] | None = None
    pivot: int | None = None
    less: list[int] | None = None
    equal: list[int] | None = None
    greater: list[int] | None = None
    k: int | None = None
