FROM node:22 AS builder

WORKDIR /app

RUN npm i

RUN npm run build

FROM node:22 AS be

WORKDIR /app

COPY --from=builder /app/dist ./

CMD [ "node", "index.js" ]
