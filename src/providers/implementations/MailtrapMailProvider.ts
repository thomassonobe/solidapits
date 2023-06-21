import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvier";
import nodemailer from 'nodemailer'

export class MailtrapMailProvider implements IMailProvider{
    private tranposrter: Mail;
    constructor(){
        this.tranposrter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1db4a0169f3382",
                pass: "32f6f7f1992a3b"
            }
        })
    }
    
    async sendMail(message: IMessage): Promise<void> {
        await this.tranposrter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}