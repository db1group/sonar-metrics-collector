# Imagem base APLPINE
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
# RUN npm install pm2 -g

RUN npm install 

# Copia o código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Define a porta em que o servidor irá escutar
EXPOSE 5100

# Comando para iniciar o servidor
CMD ["node" , "dist/main.js"]
