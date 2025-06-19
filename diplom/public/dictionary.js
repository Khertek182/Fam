const API_URL = '/api/surnames';

const searchInput = document.getElementById('searchInput');
const letterFilter = document.getElementById('letterFilter');
const tbody = document.querySelector('#surnamesTable tbody');
const paginationDiv = document.querySelector('.pagination');

let allSurnames = [];       // все данные с сервера
let filteredSurnames = [];  // отфильтрованные данные

const pageSize = 10;        // записей на страницу
let currentPage = 1;

// Загрузка данных с сервера
async function loadSurnames() {
  try {
    const res = await fetch(API_URL);
    allSurnames = await res.json();

    // Сортировка фамилий по алфавиту (русский язык, без учёта регистра)
    allSurnames.sort((a, b) => a.surname.localeCompare(b.surname, 'ru', { sensitivity: 'base' }));

    filteredSurnames = allSurnames;
    currentPage = 1;
    renderTable();
    renderPagination();
  } catch (err) {
    console.error('Ошибка загрузки данных:', err);
  }
}

// Отрисовка таблицы
function renderTable() {
  tbody.innerHTML = '';
  const start = (currentPage - 1) * pageSize;
  const pageData = filteredSurnames.slice(start, start + pageSize);

  pageData.forEach((item, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${start + i + 1}</td>
      <td class="clickable-surname" style="cursor:pointer; color:#fff; font-weight:600;">${item.surname}</td>
      <td style="color:#fff; font-weight:600;">${item.meaning_tuvan || ''}</td>
      <td style="color:#fff; font-weight:600;">${item.meaning_russian || ''}</td>
    `;
    tbody.appendChild(row);
  });

  if (pageData.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4" style="text-align:center; padding: 15px;">Нет данных</td>`;
    tbody.appendChild(row);
  }

  // Навешиваем обработчики клика на фамилии
  document.querySelectorAll('.clickable-surname').forEach(cell => {
    cell.addEventListener('click', async () => {
      const row = cell.parentElement; // tr
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const rowIndex = rows.indexOf(row);
      const index = (currentPage - 1) * pageSize + rowIndex;
      const data = filteredSurnames[index];

      // Показываем основную информацию
      document.getElementById('modalSurname').textContent = data.surname;

      // Загружаем дополнительные данные с сервера с улучшенной обработкой ошибок
      try {
        const res = await fetch(`${API_URL}/${data.id}/details`);
        if (!res.ok) {
          const text = await res.text(); // текст ошибки от сервера, если есть
          throw new Error(`Ошибка HTTP: ${res.status} - ${text}`);
        }
        const details = await res.json();

        const detailsContainer = document.getElementById('modalDetails');
        if (!details.length) {
          detailsContainer.innerHTML = '<p>Дополнительная информация отсутствует</p>';
        } else {
          let html = '<table><tbody>';
          details.forEach(d => {
            html += `<tr><td><strong>${d.detail_key}</strong></td><td>${d.detail_value}</td></tr>`;
          });
          html += '</tbody></table>';
          detailsContainer.innerHTML = html;
        }
      } catch (err) {
        console.error('Ошибка загрузки деталей:', err);
        document.getElementById('modalDetails').innerHTML = `<p>Ошибка загрузки дополнительной информации: ${err.message}</p>`;
      }

      // Показываем модальное окно
      document.getElementById('modal').style.display = 'flex';
    });
  });
}


// Отрисовка пагинации
function renderPagination() {
  paginationDiv.innerHTML = '';
  const pageCount = Math.ceil(filteredSurnames.length / pageSize);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderTable();
      renderPagination();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
    paginationDiv.appendChild(btn);
  }
}

// Фильтрация данных по поиску и букве
function filterData() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const activeLetterBtn = letterFilter.querySelector('button.active');
  const activeLetter = activeLetterBtn ? activeLetterBtn.getAttribute('data-letter') : 'all';

  filteredSurnames = allSurnames.filter(item => {
    const surname = item.surname.toLowerCase();
    const matchesSearch = surname.includes(searchValue);
    const matchesLetter = activeLetter === 'all' ? true : surname.startsWith(activeLetter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

  currentPage = 1;
  renderTable();
  renderPagination();
}

// Обработчики событий

searchInput.addEventListener('input', () => {
  filterData();
});

document.getElementById('searchBtn').addEventListener('click', () => {
  filterData();
});

letterFilter.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    letterFilter.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    filterData();
  }
});

// Закрытие модального окна
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    document.getElementById('modal').style.display = 'none';
  }
});

// Загрузка данных при старте
loadSurnames();

