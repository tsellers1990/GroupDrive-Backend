#!/bin/bash

docker build -t selrich.registry.jetbrains.space/p/groupdrive/container-artifacts/backend:latest .
docker push selrich.registry.jetbrains.space/p/groupdrive/container-artifacts/backend:latest