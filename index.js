const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { scheduler } = require('./scripts/scheduler');
const { logger } = require('./utils/logger.util');
const fs = require('fs');
const spawn = require('child_process').spawn;

const hostname = '127.0.0.1';
const port = 3000;

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ limit: '100mb' }));

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4201');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

server.use("/views", express.static("views"));
server.get("/shut", async(req, res) => {
    try {
        logger(`Hibernating device . . .`, '');
        // await require('child_process').exec(`python3 ${__dirname}views/scripts/python/hibernate.py`);
        await spawn('python', [`${__dirname}views/scripts/python/hibernate.py`]);
        logger(`Hibernated device`, 'success');

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Run shutdown script'
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: err.message
        });
    }
});
server.get("/", (req, res) => {
    try {
        fs.readFile(__dirname+'/scripts/data/data.json', (err, fileData) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: err.message
                });
            }
            try {
                const object = JSON.parse(fileData);
                return res.status(200).send({
                    success: true,
                    status: 200,
                    data: object
                });
            } catch (err) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: err.message
                });
            }
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: err.message
        });
    }
});

const run_server_scripts = () => {
    try {
        logger(`Development Server started on Port ${port}`, 'success');
        scheduler({hours: 0, mins: 0, secs: 30, msg: 'Your shift is over go home and rest! Get ready for tomorrow.'});
    } catch(err) {
        logger(`Something went wrong when running server scripts!`, 'failed');
    }
}

server.listen(port, hostname, async () => {
    await logger('Starting Development Server . . .', 'action');
    run_server_scripts();
})