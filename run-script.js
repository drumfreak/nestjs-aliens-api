// * Allows for OS specific handling of scripts/paths for npm run
const { exec } = require('child_process');

let script;
switch (process.platform) {
  case 'win32': {
    script = process.argv[2].replace(/\//g, '\\');
    break;
  }
  default: {
    script = process.argv[2];
    break;
  }
}

console.log(process.argv.slice(3).join(' '));
const shell = exec(script + ' ' + process.argv.slice(3).join(' '), {
  stdio: 'inherit',
  shell: true,
});

shell.stdout.on('data', (data) => {
  process.stdout.write(data + '\r');
  if (data.includes('No changes in database schema were found')) {
    process.exit(0);
  }
  if (data.includes('generated successfully')) {
    process.exit(0);
  }
  if (data.includes('reverted successfully')) {
    process.exit(0);
  }
  if (data.includes('No migrations was found')) {
    process.exit(0);
  }
  if (data.includes('in the database. Nothing to revert!')) {
    process.exit(0);
  }
});

shell.stderr.on('data', (data) => {
  process.stderr.write(data);
});

shell.on('close', (code) => {
  console.log(script + '\nexited with code:', code);
  process.exit(code);
  // gracefully close process
});
process.stdin.resume();
