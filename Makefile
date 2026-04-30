.PHONY: help build up down test lint migrate simulate-tokenize run-compliance-check

help:
	@echo "PCI-DSS Environment - Management Commands"
	@echo "-----------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Compliance)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "simulate-tokenize  : Test the tokenization engine"
	@echo "run-compliance-check: Run a simulated continuous compliance scan"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/compliance
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

simulate-tokenize:
	docker-compose exec api python scripts/tokenize/test_engine.py

run-compliance-check:
	docker-compose exec api python scripts/validate/continuous_scan.py
