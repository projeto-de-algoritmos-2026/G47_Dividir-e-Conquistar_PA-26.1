"""Schemas do ponto de encontro ótimo."""

from pydantic import BaseModel


class City(BaseModel):
    name: str
    lon: float
    lat: float


class MeetingPointRequest(BaseModel):
    """Conjunto de pontos escolhido pelo usuário."""

    points: list[City]


class MeetingPointResponse(BaseModel):
    """Cidades da base e o ponto que minimiza a distância total."""

    cities: list[City]
    lon: float
    lat: float
    total_distance: float
