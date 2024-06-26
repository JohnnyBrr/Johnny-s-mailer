import { readFileSync } from 'fs';

function readTemplate(filePath) {
    if (filePath.search(".html") == -1 && filePath.search(".txt") == -1) {
        console.error("⚠ Invalid file: insert mail template in .html and .txt format");
        return;
    }

    let emailMessage;

    try {
        emailMessage = readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`❌ Error found reading file: ${error.message}`);
        return;
    }

    return emailMessage;
}

const htmlTemplate = readTemplate('./template/email.html');
const textTemplate = readTemplate('./template/email.txt');

export { htmlTemplate as html, textTemplate as txt };
