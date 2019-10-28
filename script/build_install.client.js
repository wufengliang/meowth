console.log(1,'build_install.client');
const { spawn, exec } = require('child_process');
const path = require('path');
const where = path.join(__dirname, '../client');

const value = process.argv[2].substr(2);
console.log(where);
if (value === 'build') {
    const ls = spawn(`${process.platform === 'win32' ? 'npm.cmd' : 'npm'}`, ['run', 'build'], { cwd: where });

    ls.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`${data}`);
    });

    ls.on('close', (code) => {
        console.log(`exit code ${code}`);
    });
}

if (value === 'install') {
    const ls = spawn(`${process.platform === 'win32' ? 'npm.cmd' : 'npm'}`, ['install'], { cwd: where });
    console.log(`This is npm i `)
    ls.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`${data}`);
    });

    ls.on('close', (code) => {
        console.log(`exit code ${code}`);
    });
}
