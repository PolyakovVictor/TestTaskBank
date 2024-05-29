FROM python:latest

ENV PYTHONUNBUFFERED 1
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8


WORKDIR /app

COPY . /app/

RUN apt-get update && apt-get install -y python3-venv

RUN python -m venv venv

ENV PATH="/app/venv/bin:$PATH"

RUN pip install poetry

RUN poetry install

EXPOSE 8000

WORKDIR /app/task