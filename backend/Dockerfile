FROM node:20-alpine

RUN apk add --no-cache openssl

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate --schema=src/db/schema.prisma

USER appuser

EXPOSE 3000

CMD ["node", "src/index.js"]