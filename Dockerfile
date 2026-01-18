FROM node:22-alpine AS builder
RUN mkdir /usr/local/app
WORKDIR /usr/local/app
COPY .env .env
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY src/ src/
COPY vite.config.ts .
COPY index.html .

RUN npm install
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /usr/local/app
COPY --from=builder /usr/local/app/dist ./dist
EXPOSE 5173
CMD ["npx", "http-server", "-p", "5173", "./dist"]





