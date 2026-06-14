# ==================== STAGE 1: Builder ====================
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
ENV NITRO_PRERENDER=false

RUN npm run build

# ==================== STAGE 2: Runtime ====================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./

USER nuxtjs

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

CMD ["node", "server/index.mjs"]
