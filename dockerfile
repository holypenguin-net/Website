FROM node:19.3.0-alpine
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build
ENV JWT_TOKEN=change_me
ENV PGUSER=holypenguin
ENV PGPASSWORD=change_me
ENV PGDATABASE=holypenguin
ENV PGHOST=localhost
ENV PGPORT=5432
EXPOSE 3000
ENTRYPOINT ["/bin/ash", "/app/entrypoint.sh"]
