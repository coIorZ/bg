FROM node:7  
MAINTAINER jsj(1069665146@qq.com)

ENV HTTP_PORT 8000

COPY . /app  
WORKDIR /app

RUN npm install; npm run build

EXPOSE 8000

CMD ["npm", "start"]