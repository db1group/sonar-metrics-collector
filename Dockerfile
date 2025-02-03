# Imagem base
FROM node:lts-slim AS build

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

RUN npm ci

# Copia o código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

# Instala as dependências
RUN npm install pm2 -g

COPY --from=build /app/node_modules node_modules
COPY --from=build /app/.env .env
COPY --from=build /app/dist dist

# Define a porta em que o servidor irá escutar
EXPOSE 5100

# Comando para iniciar o servidor
CMD ["pm2", "start" , "dist/main.js", "--no-daemon"]
