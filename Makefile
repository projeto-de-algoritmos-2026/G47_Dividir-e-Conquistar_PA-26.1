.PHONY: help install backend test

help:
	@echo "Comandos disponiveis:"
	@echo "  make install   - instala as dependencias do backend"
	@echo "  make backend   - sobe a API em http://127.0.0.1:8000"
	@echo "  make test      - roda os testes do backend"

install:
	cd backend && python3 -m venv .venv && \
		.venv/bin/pip install -r requirements.txt

backend:
	cd backend && .venv/bin/uvicorn app.main:app --reload

test:
	cd backend && .venv/bin/pytest
