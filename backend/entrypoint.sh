#!/bin/bash

while ! nc -z postgres 5432; do
  echo "Waiting for postgres..."
  sleep 1
done

python manage.py makemigrations

python manage.py migrate

exec python manage.py runserver 0.0.0.0:8000
