import { createTransport } from "nodemailer";

type Data = {
  email: string;
  content?: string;
};

export default async (data: Data) => {
  const { email, content } = data;

  const transporter = createTransport({
    service: "QQ",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // 发送者昵称和地址
    to: email, // 接收者的邮箱地址
    subject: "LightWorld|辉光世界", // 邮件主题
    html: content // 邮件内容
  };
  // 发送邮件
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response + `to:${email}`);
    }
  });
};
