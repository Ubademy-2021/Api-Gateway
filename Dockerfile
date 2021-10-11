FROM node:boron

WORKDIR /home/app

COPY app/ ./

RUN "npm install"
RUN cd -

EXPOSE $PORT

CMD ["npm","start"]
