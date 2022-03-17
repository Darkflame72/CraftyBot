FROM node:16-slim AS build-env
COPY . /app
WORKDIR /app

# rebuild esbuild to be platform specific
RUN yarn rebuild esbuild

# compile typescript to javascript
RUN yarn build

# setup image for production
FROM gcr.io/distroless/nodejs:16
COPY --from=build-env /app /app
WORKDIR /app
EXPOSE 3000

# Run the app preserving sourcemaps for error reporting
CMD ["dist/index.js"]
