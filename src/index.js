import commander from 'commander';

const program = new commander.Command();
program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .command('Usage: gendiff')
  .option(' -V, --version        output the version number')
  .option(' -h, --help           output usage information');

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ gendiff --help');
  console.log('  $ gendiff -h');
});

program.parse(process.argv);

export default () => program;
