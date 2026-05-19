.PHONY: help install dev build preview lint lint-fix format check \
	docker-build docker-dev docker-shell docker-run-build docker-run-lint ci

COMPOSE := docker compose
IMAGE := coffepomodoro-app

help: ## Show available targets
	@grep -E '^[a-zA-Z0-9_.-]+:.*##' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (bun)
	bun install

dev: ## Start Vite dev server (localhost:5173)
	npm run dev

build: ## Typecheck and production build
	npm run build

preview: ## Preview production build
	npm run preview

lint: ## Run Biome check on src/
	npm run lint

lint-fix: ## Run Biome with auto-fix
	npm run lint:fix

format: ## Format src/ with Biome
	npm run format

check: lint build ## Lint and build locally

docker-build: ## Build Docker image (oven/bun)
	$(COMPOSE) build

docker-dev: ## Dev server in Docker (http://localhost:5321)
	$(COMPOSE) up

docker-shell: ## Shell in app service container
	$(COMPOSE) run --rm app sh

docker-run-build: docker-build ## Production build inside Docker
	docker run --rm $(IMAGE) bun run build

docker-run-lint: docker-build ## Biome check inside Docker (native binary may fail on some hosts)
	docker run --rm $(IMAGE) bun run lint

ci: docker-run-build ## CI-style verify via Docker build
