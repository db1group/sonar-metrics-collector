# Health Sync Aplication

Essa aplicação é utilizada para buscar os dados do sonar, calcular as notas e retornar o valor resumido.

## Description

A project to collect metrics to HealthPanel from Sonarqube.

You need to send the project name or project keys strings

Example Request

```
http://localhost:3000/?projectKeyName=insper

```

Ou passando por virgulas. (Prefira sempre pelo nome do projeto)

```
http://localhost:3000/?projectKeys=insper-ui.docente.web,ebanx-pay.gateways

```

## Installation

```bash
$ npm install
```

## Build

```bash
$ npm run build
```

## Run Sonar

- Você precisa estar com o Docker rodando na sua máquina.
- Você precisa renomear run-sonar-exemple.sh para run-sonar.sh e inserir o usertoken no arquivo

```bash
$ npm run sonar
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

### Existe um swagger com as informações da API mais detalhadas.

Basta acessar URL/api

```bash
$ /api
```

## Send image to AWS Registry

```bash
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/u6l4x4n9

docker build -t sonar-metrics-collector .

docker tag sonar-metrics-collector:latest public.ecr.aws/u6l4x4n9/sonar-metrics-collector:latest

docker push public.ecr.aws/u6l4x4n9/sonar-metrics-collector:latest
```
