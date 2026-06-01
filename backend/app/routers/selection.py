"""Rota de seleção pela mediana das medianas."""

from dataclasses import asdict

from fastapi import APIRouter, HTTPException

from app.algorithm.sample import generate_sample
from app.algorithm.traced import select_kth_traced
from app.schemas.selection import SelectionRequest, SelectionResponse

router = APIRouter(tags=["selecao"])


@router.post("/select", response_model=SelectionResponse)
def select(request: SelectionRequest) -> SelectionResponse:
    """Roda a mediana das medianas e devolve o resultado com os passos."""
    values = request.values if request.values is not None else generate_sample()

    if not values:
        raise HTTPException(status_code=422, detail="O vetor não pode ser vazio.")
    if request.k > len(values):
        raise HTTPException(status_code=422, detail="k não pode ser maior que o tamanho do vetor.")

    result, steps = select_kth_traced(values, request.k)
    return SelectionResponse(
        values=values,
        k=request.k,
        result=result,
        steps=[asdict(step) for step in steps],
    )
