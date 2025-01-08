const express = require("express");
const nodemailer = require("nodemailer");

const server = express();

server.use(express.static(__dirname + '/public'));
server.use(express.json());

server.get("*", (req, res) => {
    res.sendFile("public/index.html", { root: __dirname });
  });

  server.post("/api/feedback", async (req, res) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "bdeni5812@xmail.ru",
          pass: "wWnnxUXQHz5uQeYjDpmR",
        },
      });
  
      const { name, phone, message } = req.body;
  
      await transporter.sendMail({
        from: "bdeni5812@xmail.ru",
        to: "daudmerzoev@mail.ru",
        subject: "Тема письма",
        text: `${name} ${phone} ${message}`,
        html: 
        `
        <p>${name}</p>
        <p>${phone}</p>
        <p>${message}</p>
        `
      });
  
      return res.status(200).send({ status: 200, message: "Успешная отправка" });
    } catch (e) {
      return res
        .status(500)
        .send({ status: 500, message: "Internal server error" });
    }
  });
  
server.listen(443, () => {
    console.log(`App listening on port 3000:`);
  });