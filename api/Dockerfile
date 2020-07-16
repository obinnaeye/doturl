FROM node:14.5.0-stretch

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD [ "npm", "start" ]
