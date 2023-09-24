#!/bin/bash

npm run test:coverage
######################
  #INSIRA SEU TOKEN AQUI
#########################
SONAR_TOKEN=squ_4c58edf798940168a760eac118d3c5bfea743f5f

# Verifica se a variável de ambiente SONAR_TOKEN está definida
if [ -z "$SONAR_TOKEN" ]; then
  echo "SONAR_TOKEN is not set"
  exit 1
fi

/usr/bin/docker run --rm -v $(pwd):/usr/src sonarsource/sonar-scanner-cli:4.7 sonar-scanner -Dsonar.login="$SONAR_TOKEN"