FROM node:22-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Build
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
