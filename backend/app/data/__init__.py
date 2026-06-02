"""Base de dados estática usada pelas aplicações do algoritmo."""

import json
from pathlib import Path

_CITIES_FILE = Path(__file__).parent / "cities.json"


def load_cities() -> list[dict]:
    """Carrega as cidades (nome, lon, lat) do arquivo JSON da base."""
    return json.loads(_CITIES_FILE.read_text(encoding="utf-8"))
