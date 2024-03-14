#!/usr/bin/env bash

cd ~/Development/blog-starter-app/infra/scripts
source bin/activate
AWS_PROFILE=khai-personal python orchestrator.py >> run.logs
