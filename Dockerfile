# Imagem base
FROM node:latest

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install pm2 -g

RUN npm install 

# Copia o código fonte
## COPY .env.prod .env
COPY . .

# Compila o TypeScript
RUN npm run build

# Define a porta em que o servidor irá escutar
EXPOSE 3030

# Comando para iniciar o servidor
CMD ["pm2", "start" , "dist/main.js", "--no-daemon"]