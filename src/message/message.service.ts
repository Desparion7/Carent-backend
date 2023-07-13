import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MessageDto } from './dto/message.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDto>,
  ) {}

  async sendMsg(body: MessageDto) {
    const message = new this.messageModel(body);
    await message.save();

    // send confirm email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'wosmateusz2@gmail.com',
      subject: `Message from ${body.email}`,
      html: `<h2>Message from ${body.name} ${body.surname}</h2><p>${body.message}</p> <p>Phone:${body.phone}</p>`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException('Problem with sending email');
    }
    return message;
  }
}
