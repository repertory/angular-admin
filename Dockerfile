FROM centos:7
MAINTAINER wangdong <mail@wangdong.io>

ENV NODE_VERSION 8.11.1
ENV PARSE_SERVER_LOGS_FOLDER /app/data/logs

RUN curl https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz | tar -xJf - -C /usr/local/ --strip-components 1 \
    && npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && echo 'sass_binary_site=https://npm.taobao.org/mirrors/node-sass' >> ~/.npmrc \
    && npm install -g pm2 \
    && npm cache verify

COPY . /app/
WORKDIR /app

RUN mv data/docker/Shanghai /etc/localtime \
    && rm -rf data/ script/.env script/config.simple.json node_modules/ package-lock.json .git/ .idea/ .c9/ \
    && npm install && npm cache verify

VOLUME ["/app/data"]
EXPOSE 80 443 4200
CMD ["pm2-runtime", "start", "ecosystem.json"]
