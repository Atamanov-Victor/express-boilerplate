FROM node:16

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/

RUN yarn
RUN npm i -g pm2

COPY . /app
RUN chown -R node:node .

USER node

ENV PORT 3000

CMD yarn run start


