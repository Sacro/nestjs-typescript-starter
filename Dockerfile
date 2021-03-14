# https://github.com/BretFisher/dockercon19

FROM node:14 as base
ENV NODE_ENV=production
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Development

FROM base as dev
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile && yarn cache clean
ENV PATH=/app/node_modules/.bin:$PATH
CMD ["nest", "start", "--watch"]

FROM dev as dev-source
COPY --chown=node:node . .

# Debugging

FROM dev as debug
CMD [ "nest", "start", "--debug", "--watch"]

FROM dev-source as debug-source
CMD [ "nest", "start", "--debug", "--watch"]


FROM debug-source as debug-source-brk
ENV DEBUG_BRK=true

# Testing

FROM dev-source as test
RUN yarn lint
RUN yarn test

FROM test as audit
USER root
RUN yarn audit --level critical
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

# Build

FROM dev-source as build
RUN yarn build
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Prod

FROM gcr.io/distroless/nodejs:14 as prod
COPY --from=build /app/node_modules/ /app/node_modules
COPY --from=build /app/dist/ /app/dist
USER nonroot
WORKDIR /app
CMD ["./dist/main.js"]
