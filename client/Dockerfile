FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
WORKDIR /app/client
RUN pnpm run build

FROM nginx:alpine AS serve
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
