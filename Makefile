.PHONY: setup
setup: ## setup project to run locally
	cd client && npm install
	cd server && npm install

.PHONY: run-dev-client
run-dev-client: ## Start the Nextjs server
	cd client && npm run dev

.PHONY: run-dev-server
run-dev-server: ## Start the server
	cd server && npm run dev

.PHONY: run-docker-build
run-docker-build: ## Build and start the database docker instance
	docker compose -f docker-compose.yml up --build -d

.PHONY: run-prisma-studio
run-prisma-studio: ## start the prisma studio
	cd server && npm run studio

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
