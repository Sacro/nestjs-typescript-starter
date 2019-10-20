# https://github.com/BretFisher/dockercon19

FROM node:12-slim as base
ENV NODE=ENV=production
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --production && yarn cache clean

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN yarn install
CMD ["nest", "start", "--debug", "--watch"

FROM base as source
COPY --chown=node:node . .
RUN yarn build

FROM source as test
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
COPY --from=dev /app/node_modules /app/node_modules
RUN yarn lint
RUN yarn test
CMD ["yarn", "test"]

FROM test as audit
USER root
RUN yarn audit --level critical
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

FROM source as prod
ENTRYPOINT ["/tini", "--"]
CMD ["node", "./dist/main.js"]y
