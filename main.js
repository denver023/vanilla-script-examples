// Add event listener to the Sign Out button
document.getElementById("signOutButton").addEventListener("click", function () {
  alert("Signed Out");
});

const api = "https://api.sampleapis.com/presidents/presidents";
getData(api)

async function getData(api) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    generateUI(json);
  } catch (error) {
    console.error(error.message);
  }
}

function generateUI(data) {
  // Cards Name Odd = Green, Even = Red
  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    const cardBorder = i % 2 === 1 ? 'card-border-red' : 'card-border-green';

    // Extract start and end years
    const tenureRange = data[i].yearsInOffice.split('-');
    const startYear = parseInt(tenureRange[0], 10);
    const endYear = parseInt(tenureRange[1], 10);
    const yearsInOffice = endYear - startYear;

    card.innerHTML = `
          <div class="${cardBorder} border-color">
            <img src="${data[i].photo}" class="card-img-top position-relative d-flex align-items-center justify-content-center" alt="Alt Image" onerror="this.src='assets/male.jpg';">
            <div class="card-body">
              <h5 class="card-title">Name:</h5>
              <p>${data[i].name}</p>
              <h5 class="card-title">Years in Office:</h5>
              <p>${yearsInOffice} years (${data[i].yearsInOffice})</p>
              <h5 class="card-title">Vice Presidents:</h5>
              <p>${data[i].vicePresidents}</p>
            </div>
          </div>
      `;
    document.getElementById("cardNumbers").appendChild(card);
  }
}




