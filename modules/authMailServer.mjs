import nodemailer from 'nodemailer';
import {readFileSync} from 'fs';

function readConnectionData(filePath) {
    if (filePath.search(".json") == -1) {
        console.error("⚠ Invalid file format: enter configuration in .json format");
        return;
    }

    let connectionData;

    try {
        connectionData = JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`❌ Error found reading file: ${error.message}`);
        return;
    }

    return connectionData;
}

const connectionData = readConnectionData('credentials/example.json');

export { connectionData as data };

// verify connection configuration
const transporter = nodemailer.createTransport({
    host: connectionData.host,
    port: connectionData.port,
    secure: connectionData.secure,
    auth: {
    user: connectionData.auth.user,
    pass: connectionData.auth.pass,
    },
});
transporter.verify(function (error, success) {
    if (error) {
        console.log(`❌ Error found connecting to the server: ${error}`);
        return;
    } else {
        console.log("✅ Server is ready to take our messages");
    }
});