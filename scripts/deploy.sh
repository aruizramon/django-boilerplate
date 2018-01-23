#!/usr/bin/env bash

STAGE=$1

[[ ${STAGE} != "dev" && ${STAGE} != "staging" && ${STAGE} != "prod" ]] &&
    echo "Deployment must be to stage \"dev\", \"staging\", or \"prod\". "
    exit 1

python manage.py collectstatic --noinput
zappa update ${STAGE}
zappa manage ${STAGE} "migrate --noinput"
