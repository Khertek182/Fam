document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const modal = document.getElementById('modal');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveBtn = document.getElementById('saveBtn');

  const surnameInput = document.getElementById('surnameInput');
  const meaningTuvanInput = document.getElementById('meaningTuvanInput');
  const meaningRussianInput = document.getElementById('meaningRussianInput');

  const tbody = document.querySelector('#surnamesTable tbody');

  // Открыть модальное окно
  addBtn.addEventListener('click', () => {
    clearForm();
    modal.classList.add('show');
  });

  // Закрыть модальное окно
  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Очистить форму
  function clearForm() {
    surnameInput.value = '';
    meaningTuvanInput.value = '';
    meaningRussianInput.value = '';
  }

  // Отправка данных на сервер
  saveBtn.addEventListener('click', () => {
    const surname = surnameInput.value.trim();
    const meaningTuvan = meaningTuvanInput.value.trim();
    const meaningRussian = meaningRussianInput.value.trim();

    if (!surname) {
      alert('Пожалуйста, введите фамилию');
      return;
    }

    // Формируем тело запроса
    const newSurname = {
      surname,
      meaning_tuvan: meaningTuvan,
      meaning_russian: meaningRussian,
    };

    // Отправляем POST-запрос
    fetch('/api/surnames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSurname),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при добавлении фамилии');
      }
      return response.json();
    })
    .then(data => {
      // Закрыть модалку
      modal.classList.remove('show');
      // Добавить новую фамилию в таблицу
      addRowToTable(data);
    })
    .catch(error => {
      alert(error.message);
      console.error('Ошибка:', error);
    });
  });

  // Добавление строки в таблицу
  function addRowToTable(item) {
    const rowCount = tbody.rows.length;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rowCount + 1}</td>
      <td>${item.surname}</td>
      <td>${item.meaning_tuvan || ''}</td>
      <td>${item.meaning_russian || ''}</td>
    `;
    tbody.appendChild(row);
  }
});
