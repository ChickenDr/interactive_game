#!/bin/bash
FROM python:3

ENV PYTHONUNBUFFERED 1 

RUN apt-get -y update 
RUN apt-get -y install vim

RUN mkdir /srv/docker-server
ADD . /srv/docker-server 

WORKDIR /srv/docker-server

RUN pip install --upgrade pip
RUN pip install -r requirements.txt