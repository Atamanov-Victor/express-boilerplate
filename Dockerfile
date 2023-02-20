FROM node:16

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./
RUN npm i -g pm2

USER node

RUN yarn install

COPY --chown=node:node . .

CMD node src/app.js

EXPOSE 3000
