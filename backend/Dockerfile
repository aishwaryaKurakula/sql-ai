FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npx prisma generate --schema=src/db/schema.prisma

USER appuser

EXPOSE 3000

CMD ["node", "src/index.js"]