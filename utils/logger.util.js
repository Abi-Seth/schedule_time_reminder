const { log } = require('console-log-colors');

exports.logger = async (msg, action) => {
    switch(action){
        case 'action':
            log.blue(`[${new Date().toISOString()}] :: ${msg}`);
            break;
        case 'success':
            log.green(`[${new Date().toISOString()}] :: ${msg}`);
            break;
        case 'failed':
            log.red(`[${new Date().toISOString()}] :: ${msg}`);
            break;
        default:
            log.cyan(`[${new Date().toISOString()}] :: ${msg}`);
    }
}