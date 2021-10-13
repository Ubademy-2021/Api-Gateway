FROM node:boron

WORKDIR /home/app

COPY app/ ./

RUN npm install
RUN npm install axios
RUN cd -

EXPOSE $PORT

CMD ["npm","start"]
