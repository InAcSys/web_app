FROM oven/bun:latest

WORKDIR /app

# Copiamos solo archivos de dependencias primero para aprovechar cache
COPY package.json bun.lock ./

RUN bun install

# Copiamos todo el código fuente
COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
