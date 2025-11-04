SHELL := /bin/bash

.PHONY: install dev backend frontend lint build docker-up docker-down

install:
	./scripts/install-deps.sh

dev:
	npx concurrently "npm run dev --workspace backend" "npm run dev --workspace frontend"

backend:
	npm run dev --workspace backend

frontend:
	npm run dev --workspace frontend

lint:
	npm run lint

build:
	npm run build

docker-up:
	docker compose up -d

docker-down:
	docker compose down
