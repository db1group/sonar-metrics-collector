#!/bin/bash

npm run test:coverage

#Insira seu token aqui
$SONAR_TOKEN= 

if [ -z "$SONAR_TOKEN" ]; then
  echo "SONAR_TOKEN is not set"
  exit 1
fi
/usr/bin/docker run --rm -v $(pwd):/usr/src sonarsource/sonar-scanner-cli:4.7 sonar-scanner -Dsonar.login=$SONAR_TOKEN