FROM node:10-alpine
RUN mkdir -p /home/node/mcbot/node_modules && chown -R node:node /home/node/mcbot
WORKDIR /home/node/mcbot
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
CMD ["node","app.js"]
