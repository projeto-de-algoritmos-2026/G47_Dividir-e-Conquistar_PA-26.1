# Visualizador da Mediana das Medianas e Ponto de Encontro Ótimo

## Integrantes

| Matrícula | Nome |
|-----------|------|
| 221022060 | Leonardo Fachinello Bonetti |


---

## Sobre

Este projeto é uma aplicação web que implementa e **visualiza** o algoritmo de **Mediana das Medianas**, utilizando o paradigma de **Dividir e Conquistar**. O **backend** é escrito em **Python (FastAPI)** e o **frontend** em **React (Vite)**.

Além de animar a execução do algoritmo passo a passo, o projeto aplica-o em um problema real: encontrar o **ponto de encontro ótimo** entre um conjunto de cidades.

---

## Como o Algoritmo Funciona

Para selecionar o k-ésimo menor elemento em `O(n)`, o algoritmo segue as etapas:

### 1. Dividir em grupos
A lista é dividida em **grupos de 5 elementos**.

### 2. Mediana de cada grupo
Cada grupo é pequeno, então sua **mediana** é obtida diretamente (ordenando os ≤ 5 elementos).

### 3. Mediana das medianas (o pivô)
O algoritmo é aplicado **recursivamente** sobre a lista das medianas para escolher o **pivô** — daí o nome do método. Esse pivô garante que uma fração constante da lista seja descartada a cada passo.

### 4. Particionar
A lista é particionada em três faixas em relação ao pivô: **menores**, **iguais** e **maiores**.

### 5. Conquistar
Comparando `k` com o tamanho das faixas, o algoritmo descobre **em qual partição** o k-ésimo elemento está e **recorre apenas nela**.


---

## A Aplicação: Ponto de Encontro Ótimo

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
