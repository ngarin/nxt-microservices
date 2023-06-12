run-from-scratch: ## run project
	$(MAKE) clean-up
	$(MAKE) build
	$(MAKE) install
	$(MAKE) link
	$(MAKE) up
.PHONY: run

clean-up:
	$(MAKE) rm-all
	$(MAKE) rm-dependencies
.PHONY: clean-up

run: ## run project
	$(MAKE) link
	$(MAKE) up
.PHONY: run

build: ## build app docker compose
	docker-compose -f docker-compose.yml build
.PHONY: build

install-svc:
	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared $(svc) npm ci
	docker run --rm -v ${CURDIR}/nxt-backend:/usr/src/nxt-backend -w /usr/src/nxt-backend $(svc) npm ci
	docker run --rm -v ${CURDIR}/$(svc):/usr/src/$(svc) -w /usr/src/$(svc) $(svc) npm ci
.PHONY: install-svc

install: ## install all dependencies
	$(MAKE) install-svc svc=nxt-node-sample
	
	# Install by CLI (don't touch)

	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared nxt-angular-sample npm ci
	docker run --rm -v ${CURDIR}/nxt-angular-sample:/usr/src/nxt-angular-sample -w /usr/src/nxt-angular-sample nxt-angular-sample npm ci

	docker run --rm -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared nxt-react-sample npm ci
	docker run --rm -v ${CURDIR}/nxt-react-sample:/usr/src/nxt-react-sample -w /usr/src/nxt-react-sample nxt-react-sample npm ci
.PHONY: install

install-dependencies: # Install dependencies inside a service and reload it
	docker run --rm -v ${CURDIR}/$(svc):/usr/src/$(svc) -w /usr/src/$(svc) $(svc) npm i $(dep)

	docker-compose -f docker-compose.yml down $(svc)
	docker-compose -f docker-compose.yml up $(svc)
.PHONY: install-dependencies

install-dev-dependencies: # Install dev dependencies inside a service and reload it
	docker run --rm -v ${CURDIR}/$(svc):/usr/src/$(svc) -w /usr/src/$(svc) $(svc) npm i -D $(dep)

	docker-compose -f docker-compose.yml down $(svc)
	docker-compose -f docker-compose.yml up $(svc)
.PHONY: install-dev-dependencies

rm-dependencies: ## remove all dependencies
	rm -rf node_modules/nxt-backend
	rm -rf node_modules/nxt-shared
	rm -rf nxt-backend/node_modules
	rm -rf nxt-shared/node_modules
	rm -rf nxt-angular-sample/node_modules
	rm -rf nxt-react-sample/node_modules
	rm -rf nxt-node-sample/node_modules
	# Remove dependencies by CLI (don't touch)
.PHONY: rm-dependencies

link: ## link all dependencies
	docker run -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared nxt-node-sample npm link
	docker run -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -v ${CURDIR}/nxt-backend:/usr/src/nxt-backend -w /usr/src/nxt-backend nxt-node-sample sh -c "npm link && npm link ../nxt-shared"
	docker run -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -v ${CURDIR}/nxt-backend:/usr/src/nxt-backend -v ${CURDIR}/nxt-node-sample:/usr/src/nxt-node-sample -w /usr/src/nxt-node-sample nxt-node-sample npm link ../nxt-shared ../nxt-backend

	## Link by CLI (don't touch)

	docker run -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -v ${CURDIR}/nxt-angular-sample:/usr/src/nxt-angular-sample -w /usr/src/nxt-angular-sample nxt-angular-sample npm link ../nxt-shared

	docker run -v ${CURDIR}/nxt-shared:/usr/src/nxt-shared -v ${CURDIR}/nxt-react-sample:/usr/src/nxt-react-sample -w /usr/src/nxt-react-sample nxt-react-sample npm link ../nxt-shared
.PHONY: link

up: ## run all app in docker
	#rm -rf mongo_data
	docker-compose -f docker-compose.yml up -d
.PHONY: up

start: ## start app in docker
	docker-compose start $(svc)
.PHONY: start

start-all: ## start all apps in docker
	$(MAKE) start svc=nxt-server
	$(MAKE) start svc=nxt-mongo-db
	$(MAKE) start svc=nxt-s3
	$(MAKE) start svc=nxt-node-sample
	$(MAKE) start svc=nxt-angular-sample
	$(MAKE) start svc=nxt-react-sample
.PHONY: start-all

stop: ## stop app in docker
	docker-compose stop $(svc)
.PHONY: stop

stop-all: ## stop all apps in docker
	$(MAKE) stop svc=nxt-server
	$(MAKE) stop svc=nxt-mongo-db
	$(MAKE) stop svc=nxt-s3
	$(MAKE) stop svc=nxt-node-sample
	$(MAKE) stop svc=nxt-angular-sample
	$(MAKE) stop svc=nxt-react-sample
.PHONY: stop-all

rm-all: ## stop all apps in docker
	$(MAKE) rm svc=nxt-server
	$(MAKE) rm svc=nxt-mongo-db
	$(MAKE) rm svc=nxt-s3
	$(MAKE) rm svc=nxt-node-sample
	$(MAKE) rm svc=nxt-angular-sample
	$(MAKE) rm svc=nxt-react-sample
.PHONY: rm-all

rm: ## remove all app in docker
	docker-compose rm $(svc)
.PHONY: rm

down-rm: ## remove all app in docker
	docker-compose -f docker-compose.yml down --rmi all
.PHONY: down

down: ## remove all app in docker
	docker-compose -f docker-compose.yml down
.PHONY: down

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
