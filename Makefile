.PHONY: run-dev-server
run-dev-server: ## Start the server
	cd server && npm run dev


.PHONY: run-docker-build
run-docker-build: ## Build and start the database docker instance
	docker compose -f docker-compose.yml up --build -d

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
