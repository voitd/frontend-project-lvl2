

[![Actions Status](https://github.com/voitd/frontend-project-lvl2/workflows/GenDiff%20CI/badge.svg)](https://github.com/voitd/frontend-project-lvl2/actions?query=workflow%3A"GenDiff+CI")
[![Maintainability](https://api.codeclimate.com/v1/badges/bfc1d480366dd4e52f3e/maintainability)](https://codeclimate.com/github/voitd/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bfc1d480366dd4e52f3e/test_coverage)](https://codeclimate.com/github/voitd/frontend-project-lvl2/test_coverage)

# gen-diff-cli

>A command line interface utility for finding differences in configuration files.

### 🎛 Features of the utility:

- program supports input file types: `.yml` `.ini` `.json`
- and have three output types: `tree` `plain` `json`

### 💾 Install

`npm i gendiff`

### 💻 Usage
```
gendiff -h

Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format: plain, tree, json (default: "tree")
  -h, --help           output usage information

```

## :bulb: Examples:

`$ gendiff --format tree first-config.json second-config.json`

<p align="center">
  <img alt="gendiff --format tree first-config.json second-config.json"  src="https://user-images.githubusercontent.com/60138143/80643490-d7d12680-8a70-11ea-9371-d39239c5ec6d.png">
</p>

`$ gendiff --format plain first-config.json second-config.json`

 <p align="center">
  <img alt="gen
diff
 --format plain first-config.json second-config.json"  src="https://user-images.githubusercontent.com/60138143/80643690-2bdc0b00-8a71-11ea-9e2c-a026173f351b.png">
</p>

`$ gendiff --format json first-config.json second-config.json`

## :hammer: Technologies:

- ES6
- Node.js
- Eslint
- GitHub Actions
- Npm
- lodash
