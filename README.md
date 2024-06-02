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

#### and another .env file in the frontend/ directory:
```plaintext

Example .env file

REACT_APP_API_URL=http://127.0.0.1:8000/

```


#### Build and run Docker containers:

```sh
docker-compose up --build -d
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
