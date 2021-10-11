FROM node:boron

WORKDIR /home/app

COPY app/ ./

RUN cd -

EXPOSE $PORT

CMD ["npm","start"]
