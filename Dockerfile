FROM node:8
CMD ["/usr/bin/node", "/app/index.js"]
USER node
WORKDIR app

RUN mkdir build
WORKDIR build
COPY --chown=node:node . .

RUN npm install
RUN cp -r package.json dist/* ../

WORKDIR ../
RUN npm install --prod
