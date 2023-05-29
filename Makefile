run-from-scratch: ## run project
	$(MAKE) rm-dependencies
	$(MAKE) rm
	$(MAKE) build
	$(MAKE) install
	$(MAKE) link
	$(MAKE) up
.PHONY: run

run: ## run project
	$(MAKE) link
	$(MAKE) up
.PHONY: run

build: ## build app docker compose
	docker-compose -f docker-compose.yml build
.PHONY: build

install-local:
	cd nxt-shared && npm i && npm link
	cd nxt-backend && npm i && npm link && npm link nxt-shared
	cd nxt-node-sample && npm i && npm link nxt-shared nxt-backend
.PHONY: install-local

install-svc:
	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared $(svc) npm ci
	docker run --rm -v ${CURDIR}/nxt-backend:/usr/src/nxt-backend -w /usr/src/nxt-backend $(svc) npm ci
	docker run --rm -v ${CURDIR}/$(svc):/usr/src/$(svc) -w /usr/src/$(svc) $(svc) npm ci
.PHONY: install-svc

install: ## install all dependencies
	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared nxt-node-sample npm ci
	docker run --rm -v ${CURDIR}/nxt-backend:/usr/src/nxt-backend -w /usr/src/nxt-backend nxt-node-sample npm ci
	docker run --rm -v ${CURDIR}/nxt-node-sample:/usr/src/nxt-node-sample -w /usr/src/nxt-node-sample nxt-node-sample npm ci
	
	# Install by CLI (don't touch)

	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared nxt-angular-sample npm ci
	docker run --rm -v ${CURDIR}/nxt-angular-sample:/usr/src/nxt-angular-sample -w /usr/src/nxt-angular-sample nxt-angular-sample npm ci
.PHONY: install

rm-dependencies: ## remove all dependencies
	rm -rf node_modules/nxt-backend
	rm -rf node_modules/nxt-shared
	rm -rf nxt-backend/node_modules
	rm -rf nxt-shared/node_modules
	rm -rf nxt-angular-sample/node_modules
	rm -rf nxt-node-sample/node_modules
	# Remove dependencies by CLI (don't touch)
.PHONY: rm-dependencies

link: ## link all dependencies
	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -v ${CURDIR}/nxt-backend:/usr/src/nxt-backend -v ${CURDIR}/nxt-node-sample:/usr/src/nxt-node-sample -w /usr/src nxt-node-sample npm link --prefix nxt-shared && npm link --prefix nxt-backend && npm link nxt-shared --prefix nxt-backend && npm link nxt-shared nxt-backend --prefix nxt-node-sample

	## Link by CLI (don't touch)

	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -v ${CURDIR}/nxt-angular-sample:/usr/src/nxt-angular-sample -w /usr/src nxt-angular-sample npm link --prefix nxt-shared && npm link nxt-shared --prefix nxt-angular-sample
.PHONY: link

up: ## run all app in docker
	#rm -rf mongo_data
	docker-compose -f docker-compose.yml up -d
.PHONY: up

start: ## start app in docker
	docker-compose start $(svc)
.PHONY: start

start-all: ## start all apps in docker

.PHONY: start-all

stop: ## stop app in docker
	docker-compose stop $(svc)
.PHONY: stop

stop-all: ## stop all apps in docker
	docker-compose stop server
.PHONY: stop-all

rm: ## remove all app in docker
	docker-compose -f docker-compose.yml down --rmi all
.PHONY: rm

logf:
	docker logs -f --tail 100 $(svc)
.PHONY: logf

exec:
	docker exec $(svc) $(cmd)
.PHONY: exec

cli:
	node cli
.PHONY: cli

gen-certs:
	openssl req -x509 -nodes -days 99999 -newkey rsa:2048 -keyout server/certs/nxt-microservices.localhost.key -out server/certs/nxt-microservices.localhost.crt -config server/certs/localhost.conf
.PHONY: gen-certs
