// /api/feedback.js

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Настройка транспортер для отправки письма
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,     // Используем переменные окружения
          pass: process.env.EMAIL_PASS,    // Используем переменные окружения
        },
      });

      const { name, phone, message } = req.body;

      // Отправка письма
      await transporter.sendMail({
        from: process.env.EMAIL_USER,  // От кого
        to: "daudmerzoev@mail.ru",    // Кому
        subject: "Тема письма",
        text: `""${name} ${phone} ${message}`,
        html: `
          <p><strong>Ф.И.О:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Сообщение:</strong> ${message}</p>
        `,
      });

      res.status(200).json({ status: 200, message: "Успешная отправка" });
    } catch (error) {
      console.error("Ошибка при отправке email:", error);
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
    }
  } else {
    res.status(405).json({ status: 405, message: "Метод не поддерживается" });
  }
};
