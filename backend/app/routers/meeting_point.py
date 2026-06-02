"""Rota do ponto de encontro ótimo entre as cidades."""

from fastapi import APIRouter

from app.data import load_cities
from app.schemas.meeting_point import MeetingPointResponse
from app.usecases.meeting_point import optimal_meeting_point, total_distance

router = APIRouter(tags=["ponto-de-encontro"])


@router.get("/meeting-point", response_model=MeetingPointResponse)
def meeting_point() -> MeetingPointResponse:
    """Devolve as cidades e o ponto ótimo (mediana das coordenadas)."""
    cities = load_cities()
    lon, lat = optimal_meeting_point(cities)
    return MeetingPointResponse(
        cities=cities,
        lon=lon,
        lat=lat,
        total_distance=total_distance(cities, lon, lat),
    )
