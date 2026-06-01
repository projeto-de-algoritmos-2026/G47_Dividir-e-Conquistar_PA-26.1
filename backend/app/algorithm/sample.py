"""Geração de um vetor de exemplo para demonstrar o algoritmo."""

import random

DEFAULT_SIZE = 23
MAX_VALUE = 99


def generate_sample(size: int = DEFAULT_SIZE) -> list[int]:
    """Gera um vetor embaralhado de ``size`` inteiros entre 0 e ``MAX_VALUE``."""
    return [random.randint(0, MAX_VALUE) for _ in range(size)]
