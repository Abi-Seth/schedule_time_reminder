const { logger } = require('./logger.util');

exports.startBrowserServer = async () => {
    try {
        const port = 4201;
        logger(`Browsering Server started on Port ${port}`, 'success');
        logger(`Running scheduled task . . .`, '');
        await require('child_process').exec(`start http://127.0.0.1:${port}/views`);
    } catch(err) {
        logger(`Something went wrong when running the browser server!`, 'failed');
    }
}