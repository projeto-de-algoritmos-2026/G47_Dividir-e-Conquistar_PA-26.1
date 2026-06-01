"""Ponto de entrada da API do backend.

Projeto: demonstracao visual do algoritmo de Dividir e Conquistar
"Mediana das Medianas". Por enquanto a aplicacao apenas inicializa o
servidor FastAPI e expoe um endpoint de verificacao de saude. Os
endpoints do algoritmo serao adicionados nos proximos commits.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mediana das Medianas API",
    description="Backend para a demonstracao visual do algoritmo Mediana das Medianas.",
    version="0.1.0",
)

# Libera o acesso do frontend (React) durante o desenvolvimento.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    """Verifica se a API esta no ar."""
    return {"status": "ok"}
