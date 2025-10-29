import nodemailer from 'nodemailer';
import emails from './modules/xlsxToArray.mjs';
import { html, txt } from './modules/msgImport.mjs';
import { data } from './modules/authMailServer.mjs';

async function main() {
  try {
    if (!emails || emails.length === 0) {
      console.error('❌ No email address found');
      return;
    }
    if (!html || html === '') {
      console.error('❌ No html template found');
      return;
    } else if (!txt || txt === '') {
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

    emails.forEach((email) => {
      transporter.sendMail(
        {
          from: `${data.sender.name} <${data.sender.email}>`,
          //* ⬇ replyTo goes here if needed
          // replyTo: '',
          to: email,

          //* ⬇ email subject goes here
          subject: '❓',

          //* ⬇ html message and plain text message go here
          html: html,
          text: txt,

          //* ⬇ attachment goes here if needed
          // attachments: [
          //   {
          //     path: "./template/attachments/example.pdf",
          //   }
          // ],

          // //* ⬇ Headers go here (MailTrap)
          // headers: {
          //   'X-MT-Category': 'Marketing',
          // },
        },
        (err, info) => {
          let res = {};
          if (err) {
            res = {
              email: email,
              status: '❌ Failed',
              error: err.message
            };
          } else {
            res = {
              email: email,
              status: '✅ Sent',
              messageId: info.messageId,
            };
          }
          console.log(res);
        }
      );
    });
  } catch (error) {
    console.error('❌ Error sending emails:', error);
  }
}

main();
