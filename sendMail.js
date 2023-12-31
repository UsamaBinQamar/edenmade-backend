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
  html: `
  <html>
    <head>
    <style>
      @media only screen and (max-width: 600px) {
        #root {
          width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
  </head>
  <body>
          <h3 style="color: var(--Primary, #FF6900); font-family: Montserrat; font-size: 24px; font-style: normal; font-weight: 900; line-height: 26.4px; text-align: center; margin-top: 10px;">EDENMADE</h3>
    
  </body>
  <head>
    <style>
      #root {
        /* background-color: #FF6900; */
        background-color: #FF6900;
        width: 100%;
        /* margin-left: 10%;
        margin-right: 10%; */
      }
      @media only screen and (max-width: 600px) {
        #root {
          width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
  </head>
  <body>
    <center>
      <div id="root">
        <div style="padding-top: 8px; padding-bottom: 8px; color: white">
          <Table>
            <tr>
              <div style="margin: 5px">
                <th>
                  <a href="#">
                    <img
                      src="https://taxeezy.s3.amazonaws.com/facebook-24.png"
                      alt="Taxeezy"
                      width="24"
                      height="24"
                    />
                  </a>
                </th>
              </div>
              <div style="margin: 5px">
                <th>
                  <a href="#">
                    <img
                      src="https://taxeezy.s3.amazonaws.com/instagram-24.png"
                      alt="Taxeezy"
                      width="24"
                      height="24"
                    />
                  </a>
                </th>
              </div>
              <div style="margin: 5px">
                <th>
                  <a href="#">
                    <img
                      src="https://taxeezy.s3.amazonaws.com/linkedin-24.png"
                      alt="Taxeezy"
                      width="24"
                      height="24"
                    />
                  </a>
                </th>
              </div>
            </tr>
          </Table>

          <h3 style="margin-bottom: 0px;  color: rgb(255, 255, 255);text-align: center;">Edenmade.io</h3>
        </div>
      </div>
    </center>
  </body>
</html>

  `, // html body
};

const sendMail = async () => {
  try {
    const transporter = await createTransporter();
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
  } catch (error) {
    console.error("Error sending mail:", error.stack || error);
  }
};

sendMail();