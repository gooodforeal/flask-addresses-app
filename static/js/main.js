const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions');
const addressTitle = document.getElementById('address-title');
const addressDetails1 = document.getElementById('address-details1');
const addressDetails2 = document.getElementById('address-details2');
const addressDetails3 = document.getElementById('address-details3');
const addressDetails4 = document.getElementById('address-details4');

searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  if (query.length > 2) {
    fetch(`/search_address?q=${query}`)
      .then(response => response.json())
      .then(addresses => {
        suggestionsList.innerHTML = '';
        addresses.forEach(address => {
          const li = document.createElement('li');
          li.textContent = address.value;
          li.addEventListener('click', () => {
            displayAddressInfo(address);
          });
          suggestionsList.appendChild(li);
        });
      });
  } else {
    suggestionsList.innerHTML = '';
  }
});

function displayAddressInfo(address) {
  addressTitle.textContent = address.name;
  addressDetails1.textContent = `
    Адрес: ${address.value}
  `;
    addressDetails2.textContent = `
    Индекс: ${address.data.tax_office}
  `;
    addressDetails3.textContent = `
    ФИАС: ${address.data.fias_id}\n
  `;
    addressDetails4.textContent = `
    КЛАДР: ${address.data.kladr_id}
  `;
}

