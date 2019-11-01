FROM node:latest

USER root

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app/
RUN npm install

COPY . /home/node/app

ARG NPM_COMMAND
ENV NPM_COMMAND $NPM_COMMAND

RUN echo $NPM_COMMAND

CMD ["sh", "-c", "npm run ${NPM_COMMAND}"]
