#!/usr/bin/env bash

test "${0%/*}" != "./scripts" && (
        echo "Run scripts from the project root. "; exit 1
    )

PROJECT_NAME='klaviyo_weather_app'

# Python 3.6 runtime is required for AWS Lambda support.
sudo add-apt-repository -y ppa:jonathonf/python-3.6
sudo apt update

sudo apt install -y \
    autoconf automake cmake git htop libffi-dev libssl-dev virtualenv \
    postgresql-9.6 postgresql-common postgresql-contrib-9.6 \
    postgresql-server-dev-all python3.6 python3.6-dev

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install

virtualenv env --python=python3.6
source env/bin/activate
pip install -r requirements.txt

echo -n "
    CREATE DATABASE klaviyo_weather_app;
    CREATE USER klaviyo_weather_app WITH PASSWORD 'klaviyo-weather-app';
    GRANT ALL PRIVILEGES ON DATABASE klaviyo_weather_app TO klaviyo_weather_app;
" | psql

./manage.py migrate
