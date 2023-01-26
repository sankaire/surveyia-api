FROM node:18-alpine

RUN apk add dumb-init

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY --chown=node:node . /usr/src/app

RUN yarn build

USER node

EXPOSE 5500

CMD ["dumb-init", "node", "./dist/src/index.js"]