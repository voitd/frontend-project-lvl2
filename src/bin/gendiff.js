#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.1.8')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: plain, tree, json', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
