import { getProcessData } from '../util/process.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// It generates a plot using python module
const shellExec = require('child_process').spawn;
const process = shellExec('python', ["./charts/plot.py"]);

// Takes stdout data from script which executed
// with arguments and send this data to res object
process.stdout.on('data', () => console.log('Image created'));
