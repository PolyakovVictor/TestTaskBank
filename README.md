## Technology stack

- Backend: Django
- Frontend: React + TS
- Database: PostgreSQL

## Project deployment


#### Need to create an .env file in the root path '/' along with docker-compose.yml:
```plaintext

Example .env file

# these variables are needed for connect to db
POSTGRES_DB='TestTaskBank'
POSTGRES_USER='admin'
POSTGRES_PASSWORD='admin'
POSTGRES_HOST='localhost'
POSTGRES_PORT='5432'
```

#### Build and run Docker containers:

```sh
docker-compose up --build -d
```
#### After the first run, make migrations to the database:

```sh
docker-compose exec backend python manage.py migrate --noinput
```

#### Now you can go to

frontend
```sh
http://localhost
```

backend
```sh
http://localhost:8000
```
