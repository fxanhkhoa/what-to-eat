FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build 

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/

EXPOSE 3000

CMD ["node", "build/index.js"]