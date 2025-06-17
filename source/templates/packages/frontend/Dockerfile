FROM node:18.20.3-alpine3.19 AS base

FROM base AS dependency-builder
RUN apk add --no-cache libc6-compat

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/
#COPY patches /opt/app/patches

RUN yarn install

FROM base AS app-builder
WORKDIR /opt/app

COPY --from=dependency-builder /opt/app/node_modules ./node_modules
COPY ../.. .

ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn run build

FROM base AS runner
WORKDIR /opt/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=app-builder --chown=nextjs:nodejs /opt/app /opt/app

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD [ "yarn", "start" ]
