.PHONY: help install install-backend install-frontend backend frontend

help:
	@echo "Comandos disponiveis:"
	@echo "  make install   - instala as dependencias do backend e do frontend"
	@echo "  make backend   - sobe a API em http://127.0.0.1:8000"
	@echo "  make frontend  - sobe a visualizacao em http://127.0.0.1:5173"

install: install-backend install-frontend

install-backend:
	cd backend && python3 -m venv .venv && \
		.venv/bin/pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

backend:
	cd backend && .venv/bin/uvicorn app.main:app --reload

frontend:
	cd frontend && npm run dev
