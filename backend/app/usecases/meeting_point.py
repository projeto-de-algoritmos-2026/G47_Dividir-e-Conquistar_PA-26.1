"""Ponto de encontro ótimo: a mediana minimiza a distância total (Manhattan)."""

from app.algorithm.select import select_kth


def median(values: list[float]) -> float:
    """Mediana (menor das centrais) obtida pela mediana das medianas."""
    return select_kth(values, (len(values) + 1) // 2)


def optimal_meeting_point(points: list[dict]) -> tuple[float, float]:
    """Ponto que minimiza a soma das distâncias de Manhattan às cidades."""
    lon = median([p["lon"] for p in points])
    lat = median([p["lat"] for p in points])
    return lon, lat


def total_distance(points: list[dict], lon: float, lat: float) -> float:
    """Soma das distâncias de Manhattan de (lon, lat) até cada cidade."""
    return sum(abs(p["lon"] - lon) + abs(p["lat"] - lat) for p in points)
