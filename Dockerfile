# https://github.com/BretFisher/dockercon19

FROM node:20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

# Development

FROM base AS dev
ENV NODE_ENV=development
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV PATH=/app/node_modules/.bin:$PATH
CMD ["nest", "start", "--watch"]

FROM dev AS dev-source
COPY --chown=node:node . .

# Debugging

FROM dev AS debug
CMD [ "nest", "start", "--debug", "--watch"]

FROM dev-source AS debug-source
CMD [ "nest", "start", "--debug", "--watch"]


FROM debug-source AS debug-source-brk
ENV DEBUG_BRK=true

# Testing

FROM dev-source AS test
RUN yarn lint
RUN yarn test

FROM test AS audit
USER root
RUN yarn audit --level critical
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN /microscanner "$MICROSCANNER_TOKEN" --continue-on-failure

# Build

FROM dev-source AS build
RUN pnpm run build

# Prod

FROM gcr.io/distroless/nodejs20-debian12 AS prod
COPY --from=build /app/node_modules/ /app/node_modules
COPY --from=build /app/dist/ /app/dist
USER nonroot
WORKDIR /app
CMD ["./dist/main.js"]
