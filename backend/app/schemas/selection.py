"""Schemas da seleção pela mediana das medianas."""

from pydantic import BaseModel, Field


class SelectionRequest(BaseModel):
    """Parâmetros da seleção. Se ``values`` for omitido, gera-se um exemplo."""

    values: list[int] | None = None
    k: int = Field(ge=1, description="Posição (1-indexada) do menor elemento buscado.")


class StepSchema(BaseModel):
    """Estado de uma etapa da execução."""

    phase: str
    values: list[int]
    description: str
    groups: list[list[int]] | None = None
    medians: list[int] | None = None
    pivot: int | None = None
    less: list[int] | None = None
    equal: list[int] | None = None
    greater: list[int] | None = None
    k: int | None = None


class SelectionResponse(BaseModel):
    """Resultado da seleção e os passos da execução."""

    values: list[int]
    k: int
    result: int
    steps: list[StepSchema]
