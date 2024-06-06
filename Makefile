SHELL = /bin/sh


.PHONY: dev
dev:
	pnpm dev --host

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

.PHONY: dist
dist: lint clean
	pnpm build

.PHONY: preview
preview: dist
	pnpm preview --host

.PHONY: clean
clean:
	rm -r dist || exit 0
