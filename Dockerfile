FROM node:boron

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json package-lock.json ./

RUN npm install

COPY . .

RUN npm test

EXPOSE 8080
CMD [ "npm", "start" ]