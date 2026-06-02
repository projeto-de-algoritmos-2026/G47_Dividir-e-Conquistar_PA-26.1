# Visualizador da Mediana das Medianas e Ponto de Encontro Ótimo

## Integrantes

| Matrícula | Nome |
|-----------|------|
| 221022060 | Leonardo Fachinello Bonetti |


---

## Sobre

Este projeto é uma aplicação web que implementa e **visualiza** o algoritmo de **Mediana das Medianas**, utilizando o paradigma de **Dividir e Conquistar**. O **backend** é escrito em **Python (FastAPI)** e o **frontend** em **React (Vite)**.

A segunda tela mostra um uso prático do algoritmo. Dado um conjunto de cidades, qual é o ponto que **minimiza a distância total** até todas elas?

Na distância de **Manhattan**, a soma das distâncias **se separa por eixo**, e o minimizador em cada eixo é a **mediana** das coordenadas. Logo, o ponto ótimo é:

```
(mediana das longitudes, mediana das latitudes)
```

Ou seja, **duas execuções** da Mediana das Medianas, uma para cada eixo. As cidades e o ponto ótimo são desenhados sobre o mapa do Brasil, e o usuário pode clicar para escolher novos pontos e ver o ótimo ser recalculado.

---

## Screenshots


---

## Como Executar

### Pré-requisitos
* [Python 3.12+](https://www.python.org/)
* [Node.js](https://nodejs.org/)

### Passos
1. Clone este repositório e entre na pasta do projeto.
2. Instale as dependências do backend e do frontend:
   ```bash
   make install
   ```
3. Em um terminal, suba a **API** (backend):
   ```bash
   make backend
   ```
   A API ficará disponível em `http://127.0.0.1:8000`.
4. Em outro terminal, suba a **visualização** (frontend):
   ```bash
   make frontend
   ```
   A aplicação ficará disponível em `http://localhost:5173`.
