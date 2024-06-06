SHELL = /bin/sh


.PHONY: dev
dev:
	pnpm dev --host

.PHONY: dist
dist: clean
	pnpm build

.PHONY: preview
preview: dist
	pnpm preview --host

.PHONY: clean
clean:
	rm -r dist || exit 0
