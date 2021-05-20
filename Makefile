PHONY: build
build: build-app.app-1 build-app.app-2 build-app.shell

PHONY: install
install: install-app.app-1 install-app.app-2 install-app.shell

PHONY: serve
serve:
	@echo "Open browser at http://localhost:8000"
	@python3 server.py

.PHONY: build-app.%
build-app.%:
	cd $*; npm run build

.PHONY: install-app.%
install-app.%:
	cd $*; npm install