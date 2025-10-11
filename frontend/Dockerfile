FROM node:18-alpine

WORKDIR /usr/src/app

# Accept build argument for API URL
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev:docker", "--", "--host", "0.0.0.0"]
