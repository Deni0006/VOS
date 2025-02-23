// Обработчик отправки формы
document.getElementById('feedback-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    // Отправляем данные на сервер
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      // Отображаем результат отправки
      const responseMessage = document.getElementById('response-message');
      if (result.status === 200) {
        responseMessage.textContent = result.message;
        responseMessage.style.color = 'green';
      } else {
        responseMessage.textContent = 'Произошла ошибка при отправке.';
        responseMessage.style.color = 'red';
      }
    } catch (error) {
      console.error('Ошибка:', error);
      const responseMessage = document.getElementById('response-message');
      responseMessage.textContent = 'Произошла ошибка при отправке.';
      responseMessage.style.color = 'red';
    }
  });