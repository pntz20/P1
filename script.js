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