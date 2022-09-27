FROM node:16-alpine3.14
LABEL version="1.0.0"

ENV TZ=Asia/Seoul
RUN npm install -g pnpm@^6

# COPY repository
COPY . .

# build
RUN pnpm install
RUN pnpm build

EXPOSE 3000
# Start
ENTRYPOINT [ "pnpm", "start:prod" ]