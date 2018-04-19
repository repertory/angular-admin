const sendmail = require('sendmail')({silent: true});
const nodemailer = require('nodemailer');

class Mail {

  constructor(options) {
    this.transporter = null;
    this.options = Object.assign({
      smtp: null,
      verificationSubject: '请激活您的邮箱',
      verificationBody: '<p>你好 %username%，</p><p>感谢您注册%appname%</p><p>请点击以下链接激活你的账户</p><p><a href="%link%" target="_blank">%link%</a></p><p>如果上面的链接点击无效，请尝试将链接复制到浏览器地址栏访问。</p>',
      passwordResetSubject: '重置密码',
      passwordResetBody: '<p>你好 %username%，</p><p>您已经请求了重置密码，可以点击以下链接进行操作</p><p><a href="%link%" target="_blank">%link%</a></p><p>如果您没有请求重置密码，请忽略此邮件。</p><p>在您点击上面链接修改密码之前，您的密码将会保持不变。<p>'
    }, options || {});

    if (!this.options.fromAddress) {
      throw '发送邮箱未设置';
    }

    if (!this.options.sendmail && this.options.smtp) {
      this.transporter = nodemailer.createTransport(this.options.smtp, {
        from: `${this.options.fromName} <${this.options.fromAddress}>`,
      });
    }
  }

  fillVariables(text, options) {
    text = text.replace(/%username%/ig, options.user.get('username'));
    text = text.replace(/%email%/ig, options.user.get('email'));
    text = text.replace(/%appname%/ig, options.appName);
    text = text.replace(/%link%/ig, options.link);
    return text;
  }

  emailFrom(fromAddress, fromName) {
    if (fromName) {
      return '=?utf-8?B?' + new Buffer(fromName).toString('base64') + '?=<' + fromAddress + '>';
    }
    return fromAddress;
  }

  sendVerificationEmail(options) {
    return this.sendMail({
      to: options.user.get('email'),
      subject: this.fillVariables(this.options.verificationSubject, options),
      html: this.fillVariables(this.options.verificationBody, options)
    });
  }

  sendPasswordResetEmail(options) {
    return this.sendMail({
      to: options.user.get('email'),
      subject: this.fillVariables(this.options.passwordResetSubject, options),
      html: this.fillVariables(this.options.passwordResetBody, options)
    });
  }

  sendMail(mail) {
    return new Promise((resolve, reject) => {
      if (this.transporter) {
        // 使用smtp发送
        this.transporter.sendMail({
          to: mail.to,
          subject: mail.subject,
          html: mail.html || mail.text
        }, (error, info) => {
          if (error) {
            return reject(error);
          }
          resolve(info);
        });

      } else {
        // 使用sendmail发送
        sendmail({
          from: this.emailFrom(this.options.fromAddress, this.options.fromName),
          to: mail.to,
          subject: '=?utf-8?B?' + new Buffer(mail.subject).toString('base64') + '?=',
          type: 'text/html',
          charset: 'utf-8',
          encoding: 'base64',
          html: mail.html || mail.text
        }, function (err, reply) {
          if (err) {
            reject(err);
          }
          resolve(reply);
        });
      }

    });
  }
}

module.exports.Mail = Mail;
module.exports.default = Mail;
