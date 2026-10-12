FROM node:20-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg imagemagick webp git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY . .

# Koyeb can run this as a worker; WhatsApp bots generally do not need an HTTP port.
CMD ["node", "keith.js"]
