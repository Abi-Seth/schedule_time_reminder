const cron_job = require('node-cron');
const { startBrowserServer } = require('../utils/browser_server_initializer.util');
const { logger } = require('../utils/logger.util');
// const { changeScheduleData } = require('../scripts/browser_handler.script');
const fs = require('fs');

exports.scheduler = (
    event = {hours: 0, mins: 0, secs: 45, msg: 'Your shift is over go home and rest! Nice walk home'}
) => {
    cron_job.schedule('* * * * *', async () => {
        try {
            const activity = {
                hours: event.hours,
                mins: event.mins,
                secs: event.secs,
                msg: event.msg
            };
            logger('Recording scheduled activities . . .', '');
            await fs.writeFile(__dirname+'\\data\\data.json', JSON.stringify(activity), err => {
                if (err) {
                    logger('Error recording schedule', 'failed');
                } else {
                    logger('Successfully kept track for schedule', 'success');
                }
            })
            await logger(`Starting Browsering Server . . .`, 'action');
            await startBrowserServer();
            // changeScheduleData(event.hours, event.mins, event.secs, event.msg);
        } catch(err) {
            logger('Something went wrong when running a scheduler!', 'failed');
        }
    });
}