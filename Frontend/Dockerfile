FROM node:16

RUN mkdir -p /app

WORKDIR /app

COPY /package*.json ./

RUN cd /app

RUN npm install 

RUN npm run build

RUN npm start