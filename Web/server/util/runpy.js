const { spawn } = require('node:child_process');
const path = require('node:path');

const child = spawn(process.env.PYTHON_BIN || 'python3', [path.join(__dirname, '../python_scripts/app.py')], {
  cwd: path.join(__dirname, '..'), stdio: 'inherit', shell: false,
});
child.on('error', () => { console.error('Could not start Python worker'); process.exitCode = 1; });
child.on('exit', (code) => { process.exitCode = code ?? 1; });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
