
var nodemailer = require('nodemailer');
const User = use('App/Models/User');
const PasswordRequest = use('App/Models/PasswordRequest')
class EmailService {
    
    transporter(){
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'haranzalez@gmail.com',
              pass: 'sha1(1144026028)'
            }
        });
    }

    options(option){
        return {
            from: option.from,
            to: option.to,
            subject: option.subject,
            text: option.text,
        }
    }

    sendPasswordResetEmail(options){
        this.transporter().sendMail(this.options(options), function(error, info){
            if (error) {
             return error;
            } else {
                User.find(options.user_id).then(user => {
                    PasswordRequest.create({
                        user_id: options.user_id,
                        ip: options.ip,
                        token: options.token,
                        expires: options.expires,
                    }).catch(err => {console.log(err)})   
               }).catch(err => {
                   console.log(err)
               })

            }
        });
    }

    sendPasswordResetConfirmationEmail(options){
        this.transporter().sendMail(this.options(options), function(error, info){
            if (error) {
             return error;
            }
        });
    }

}

module.exports = EmailService;