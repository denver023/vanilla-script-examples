const api = "https://api.sampleapis.com/presidents/presidents";
let currentPage = 1;
const presidentPerPage = 6;
let totalPresidents = 0;
let allPresidentsData = [];

getData(api);

async function getData(api) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    allPresidentsData = await response.json();
    totalPresidents = allPresidentsData.length;

    // Initial render of first page
    renderPresidents(currentPage);
    setupPagination();
  } catch (error) {
    console.error(error.message);
  }
}

function renderPresidents(page) {
  const cardPresident = document.getElementById('cardNumbers');
  cardPresident.innerHTML = '';

  const startIndex = (page - 1) * presidentPerPage;
  const endIndex = startIndex + presidentPerPage;
  const pagePresidents = allPresidentsData.slice(startIndex, endIndex);

  for (let i = 0; i < pagePresidents.length; i++) {
    const president = pagePresidents[i];
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    const cardBorder = (startIndex + i) % 2 === 1 ? 'card-border-red' : 'card-border-green';

    const tenureRange = president.yearsInOffice.split('-');
    const startYear = parseInt(tenureRange[0], 10);
    const endYear = parseInt(tenureRange[1], 10);
    const yearsInOffice = endYear - startYear;

    card.innerHTML = `
    <div class="${cardBorder} border-color">
      <img src="${president.photo}" class="card-img-top position-relative d-flex align-items-center justify-content-center" alt="Alt Image" onerror="this.src='assets/male.jpg';">
      <div class="card-body">
        <h5 class="card-title">Name:</h5>
        <p>${president.name}</p>
        <h5 class="card-title">Years in Office:</h5>
        <p>${yearsInOffice} years (${president.yearsInOffice})</p>
        <h5 class="card-title">Vice Presidents:</h5>
        <p>${president.vicePresidents}</p>
      </div>
    </div>
  `;
    cardPresident.appendChild(card);
  }
}

function setupPagination() {
  const prevPage = document.getElementById('prevPage');
  const prevPageItem = prevPage.closest('.page-item');
  const nextPage = document.getElementById('nextPage');
  const totalPages = Math.ceil(totalPresidents / presidentPerPage);

  // Previous page button
  prevPage.onclick = function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderPresidents(currentPage);
      setupPagination();
    }
  };

  // Disable or enable previous button based on current page
  if (currentPage === 1) {
    prevPageItem.classList.add('disabled');
  } else {
    prevPageItem.classList.remove('disabled');
  }

  // Next page button
  nextPage.onclick = function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderPresidents(currentPage);
      setupPagination();
    }
  };

  // Disable or enable next button based on current page
  const nextPageItem = nextPage.closest('.page-item');
  if (currentPage === totalPages) {
    nextPageItem.classList.add('disabled');
  } else {
    nextPageItem.classList.remove('disabled');
  }
}

// Add event listener to the Sign Out button
document.getElementById("signOutButton").addEventListener("click", function () {
  alert("Signed Out");
});