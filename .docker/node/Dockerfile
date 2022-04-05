FROM node:16.13-alpine

# create root folder
WORKDIR /usr/app/codicatest

# copy pacage files: package.json and package-lock.json
COPY ./package*.json ./

RUN npm install --only=development
# RUN npm ci --only=production

# Copy source
COPY . .

# Build app
RUN npm run build

CMD ["node", "dist/main"]