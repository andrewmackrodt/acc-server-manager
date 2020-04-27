SHELL=/bin/bash

.PHONY: build deploy

build:
	@npm run build:prod

deploy: build
	@sh -c "echo 'Not Supported' >&2 && exit 1"
