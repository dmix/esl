# ---------------------------------------------------------------------------------
# ESL APP
# ---------------------------------------------------------------------------------

# -- Options

_ENV=production

# -- Helpers

clean:
	@rm **/.DS_Store .DS_Store

install:
	@sudo gem install scss-lint bundler
	@npm install -g gulp@next babel-core babel-preset-es2015 babel-cli foundation-cli  foundation-sites
	# imagemin

build:
	@npm run gulp build

watch:
	@npm run gulp

dev: 
	@tmuxp ./.tmuxp.yaml

.PHONY: clean install build watch dev
.DEFAULT_GOAL := build 
