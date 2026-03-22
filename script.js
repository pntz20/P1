function renderTable(filteredData) {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  filteredData.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.date}</td>
      <td>${row.location}</td>
      <td>${row.name}</td>
      <td contenteditable="true">${row.notes}</td>
    `;

    tbody.appendChild(tr);
  });
}

// initial load
renderTable(data);

function filterData() {
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;
  const location = document.getElementById("location").value.toLowerCase();
  const name = document.getElementById("name").value.toLowerCase();

  const filtered = data.filter(row => {
    const rowDate = row.date;
    const rowLocation = row.location.toLowerCase();
    const rowName = row.name.toLowerCase();

    const matchesDate =
      (!dateFrom || rowDate >= dateFrom) &&
      (!dateTo || rowDate <= dateTo);

    const matchesLocation =
      !location || rowLocation.includes(location);

    const matchesName =
        !name || rowName.includes(name);

    return matchesDate && matchesLocation && matchesName;
  });

  renderTable(filtered);
}