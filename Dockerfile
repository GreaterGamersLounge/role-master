FROM node:latest

USER root

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  postgresql-client-12 \
  && rm -rf /var/lib/apt/lists/*

COPY package.json /home/node/app/
RUN npm install

COPY . /home/node/app

ARG NPM_COMMAND
ENV NPM_COMMAND $NPM_COMMAND

RUN echo $NPM_COMMAND

CMD ["sh", "-c", "npm run ${NPM_COMMAND}"]
