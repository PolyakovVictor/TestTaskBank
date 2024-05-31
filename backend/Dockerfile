FROM python:latest

ENV PYTHONUNBUFFERED=1
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

WORKDIR /app

RUN apt-get update && apt-get install -y python3-venv

COPY . /app/

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN pip install poetry

RUN poetry install --no-root

EXPOSE 8000

WORKDIR /app/task

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
