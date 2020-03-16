
publish:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .

fix:
	eslint . --fix

build:
	rm -rf dist
	npm run build

help:
	npx babel-node ./src/bin/gendiff.js -h

compare:
	npx babel-node ./src/bin/gendiff.js ./fixtures/before.json ./fixtures/after.json