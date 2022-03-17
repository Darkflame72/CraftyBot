FROM node:16-slim AS build-env
COPY .yarn /app/.yarn
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml
WORKDIR /app

# rebuild esbuild to be platform specific
RUN yarn rebuild esbuild

COPY . /app

# compile typescript to javascript
RUN yarn build

# setup image for production
# FROM gcr.io/distroless/nodejs:16
# COPY --from=build-env /app /app
# WORKDIR /app
EXPOSE 3000

# Run the app preserving sourcemaps for error reporting
CMD ["yarn", "start"]
