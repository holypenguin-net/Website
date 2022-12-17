FROM node:19.2.0-alpine
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["/bin/ash", "/app/entrypoint.sh"]
