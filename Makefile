SHELL = /bin/sh


.PHONY: dev
dev:
	pnpm dev --host

.PHONY: lint-and-test
lint-and-test: lint test

.PHONY: lint
lint: lint-pre-commit lint-format lint-types

.PHONY: lint-pre-commit
lint-pre-commit:
	pre-commit run --all-files

.PHONY: lint-format
lint-format:
	pnpm format:check

.PHONY: lint-types
lint-types:
	pnpm types:check

.PHONY: test
test:
	pnpm test:run

.PHONY: test-dev
test-dev:
	pnpm test:dev

.PHONY: dist
dist: lint test clean
	pnpm build

.PHONY: preview
preview: dist
	pnpm preview --host

.PHONY: clean
clean:
	rm -r dist || exit 0
