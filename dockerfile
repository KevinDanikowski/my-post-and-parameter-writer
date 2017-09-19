FROM node:slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY server.js /usr/src/app