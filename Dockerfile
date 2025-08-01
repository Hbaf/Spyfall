FROM node:22 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM node:22-slim AS runner

WORKDIR /app

COPY ./package*.json .

RUN npm ci --omit=dev

RUN npm install -g http-server
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080"]