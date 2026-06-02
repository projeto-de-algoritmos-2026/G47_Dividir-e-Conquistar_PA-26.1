"""Rota do ponto de encontro ótimo entre as cidades."""

from fastapi import APIRouter, HTTPException

from app.data import load_cities
from app.schemas.meeting_point import MeetingPointRequest, MeetingPointResponse
from app.usecases.meeting_point import optimal_meeting_point, total_distance

router = APIRouter(tags=["ponto-de-encontro"])


def _build(cities: list[dict]) -> MeetingPointResponse:
    lon, lat = optimal_meeting_point(cities)
    return MeetingPointResponse(
        cities=cities,
        lon=lon,
        lat=lat,
        total_distance=total_distance(cities, lon, lat),
    )


@router.get("/meeting-point", response_model=MeetingPointResponse)
def meeting_point() -> MeetingPointResponse:
    """Ponto ótimo (mediana) sobre a base de capitais."""
    return _build(load_cities())


@router.post("/meeting-point", response_model=MeetingPointResponse)
def meeting_point_custom(request: MeetingPointRequest) -> MeetingPointResponse:
    """Ponto ótimo (mediana) sobre os pontos escolhidos pelo usuário."""
    if not request.points:
        raise HTTPException(status_code=422, detail="Informe ao menos um ponto.")
    return _build([point.model_dump() for point in request.points])
