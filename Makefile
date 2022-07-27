up:
	docker-compose down && docker-compose up --build --force

bash:
	docker exec -it chat-back bash

lint:
	docker exec -it chat-back yarn lint