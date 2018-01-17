
/*
 * @Author: Cleverson Puche
 * @Date: 2017-13-12 18:59:57
 */

var Properties = Java.type("java.util.Properties")
var Message = Java.type("javax.mail.Message")
var PasswordAuthentication = Java.type("javax.mail.PasswordAuthentication")
var Session = Java.type("javax.mail.Session")
var Transport = Java.type("javax.mail.Transport")
var InternetAddress = Java.type("javax.mail.internet.InternetAddress")
var MimeMessage = Java.type("javax.mail.internet.MimeMessage")
var Authenticator = Java.type("javax.mail.Authenticator")

/**
* @description
* Bitcode de envio de email
*/

/**
  * Envia um email para um destinatário, com assunto e conteúdo
  * @param {String} recipientMail - e-mail do destinatário
  * @param {String} subject - Assunto do e-mail
  * @param {String} content - Conteúdo do e-mail
  * @param {String} [senderMail] - e-mail do remetente
  * @param {String} [senderPassword] - senha do remente
  * @example
   * sendMail("johnsmith@gmail.com", "Thust Mail Sender Test", "Hey John, how're u?")
*/
function sendMail(recipientMail, subject, content, senderMail, senderPassword) {
    var properties = new Properties()

    properties.put("mail.smtp.host", config.mail.smtpHost || "smtp.gmail.com")
    properties.put("mail.smtp.socketFactory.port", config.mail.smtpSocketFactoryPort ? config.mail.smtpSocketFactoryPort.toString() : "465")
    properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory")
    properties.put("mail.smtp.auth", config.mail.smtpAuth ? config.mail.smtpAuth.toString() : "true")
    properties.put("mail.smtp.port", config.mail.smtpPort ? config.mail.smtpPort.toString() : "465")

    var session = Session.getDefaultInstance(properties,
        new Authenticator() {
            getPasswordAuthentication: function () {
                return new PasswordAuthentication(senderMail || config.mail.senderAddress, senderPassword || config.mail.senderPassword)
            }
        }
    )

    var message = new MimeMessage(session)
    message.setFrom(new InternetAddress(senderMail || config.mail.senderAddress))
    message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientMail))
    message.setSubject(subject)
    message.setContent(content, "text/html; charset=utf-8")

    Transport.send(message)
}

exports = {
    sendMail: sendMail
}
