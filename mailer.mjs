import nodemailer from 'nodemailer';
import emails from './modules/xlsxToArray.mjs';
import { html , txt } from './modules/msgImport.mjs';
import { data } from './modules/authMailServer.mjs';


async function main() {
  try {
    if (!emails || emails.length === 0) {
      console.error('❌ No email address found');
      return;
    }
    if (!html || html === "") {
      console.error('❌ No html template found');
      return;
    } else if (!txt || txt === "") {
      console.error('❌ No plain text templates found');
      return;
    }

    const transporter = nodemailer.createTransport({
    //   pool: true,
      host: data.host,
      port: data.port,
      secure: data.secure,
      auth: {
        user: data.auth.user,
        pass: data.auth.pass,
      },
    });
    const info = await transporter.sendMail({
      from: `${data.sender.name} <${data.sender.email}>`,
      bcc: emails,
      //* ⬇ email subject goes here
      subject: 'Test message',
      html: html,
      text: txt,
    });

    console.log('📤 Messege sent: ' + info.messageId);
    console.log('✅ Accepted: ', info.accepted);
    console.log('❌ Rejected: ', info.rejected);
  } catch (error) {
    console.error('❌ Error sending emails:', error);
  }
}

main();