const nodemailer=require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();

const transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PWD,
    }
});


const sendEmail=async(userEmail,subjectMatter, message)=> {
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: subjectMatter,
      text:message
    };
}

module.exports={sendEmail};


