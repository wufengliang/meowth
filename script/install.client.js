const { exec } = require('child_process');

const param = process.argv.splice(2)[0].substr(2), cwd = `${process.cwd()}/client`;

switch (param) {
    case 'install':
        console.log('开始安装前端项目依赖...')
        exec('npm run install', { cwd }, (err, stdout, stderr) => {
            if (err) {
                throw err;
            }
            if (stdout) {
                console.log(`stdout : ${stdout}`);
            }
            if (stderr) {
                console.log(`stderr : ${stderr}`);
            }
            console.log('success');
        })
        break;
    case 'build':
        console.log('开始构建前端项目...');
        exec('npm run build', { cwd }, (err, stdout, stderr) => {
            if (err) {
                throw err;
            }

            if (stdout) {
                console.log(`stdout : ${stdout}`);
            }
            if (stderr) {
                console.log(`stderr : ${stderr}`);
            }
            console.log('success');
        })
        break;
}

// exec('npm install', { cwd: `${process.cwd()}/client` }, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('success');
// })