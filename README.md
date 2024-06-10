# api-gateway

## for local development
- docker build -t api-gateway-dev --target development .
- docker run -p 3000:3000 -v $(pwd):/usr/src/app -v /usr/src/app/node_modules api-gateway-dev

## for production 
- docker build -t api-gateway-prod --target production .
- docker run -p 3000:3000 api-gateway-prod

## test for ci cd pipeline