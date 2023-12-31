import nodemailer from "nodemailer";

const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Set to true if using port 465 with SSL
      auth: {
        user: "usamadevio@gmail.com",
        pass: "tjal gxqm qeqa fhmr", // Replace with your Gmail password
      },
    });

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error);
    throw error;
  }
};

const mailOptions = {
  from: '"Fred Foo 👻" <usamadevio@gmail.com>', // sender address
  to: "bhaisyed50@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

const sendMail = async () => {
  try {
    const transporter = await createTransporter();
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
  } catch (error) {
    console.error(error);
  }
};

// Call the sendMail function to send the email
sendMail();
