FROM python:3.11-slim

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.5.1

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

# Install system dependencies
RUN apt-get update && apt-get install python3-dev gcc build-essential libpq-dev -y

# install python dependencies
RUN pip install "poetry==$POETRY_VERSION"
COPY pyproject.toml /home/user/app/
COPY *poetry.lock /home/user/app/

WORKDIR /home/user/app/

RUN poetry config virtualenvs.create false
RUN poetry install --with dev --no-root --no-interaction --no-ansi

WORKDIR /home/user/app/backend
COPY backend/ /home/user/app/backend

USER user
CMD gunicorn {{project_name}}.wsgi --log-file - -b 0.0.0.0:8000 --reload
FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user
WORKDIR /home/user/app/backend

# Install system dependencies
RUN apt-get update && apt-get install gcc build-essential libpq-dev -y && \
    python3 -m pip install --no-cache-dir pip-tools

# install python dependencies
ADD *requirements.in /home/user/app/backend/
RUN pip-compile requirements.in > requirements.txt && \
    pip-compile dev-requirements.in > dev-requirements.txt

RUN pip install -r requirements.txt && \
    pip install -r dev-requirements.txt  && \
    pip install psycopg2-binary

# Clean the house
RUN apt-get purge libpq-dev -y && apt-get autoremove -y && \
    rm /var/lib/apt/lists/* rm -rf /var/cache/apt/*

ADD backend/ /home/user/app/backend

USER user
CMD gunicorn privacy_computing_demo.wsgi --log-file - -b 0.0.0.0:8000 --reload
