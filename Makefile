.PHONY: up
up:
	docker compose up -d

# Stop containers
.PHONY: down
down:
	docker compose down