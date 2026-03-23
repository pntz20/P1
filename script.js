let data = [
  { date: "2026-03-20", location: "Manila", name: "John Doe", notes: "" },
  { date: "2026-03-21", location: "Cebu", name: "Jane Smith", notes: "" }
];

const saved = localStorage.getItem("dashboardData"); // 1. Get saved data
if (saved) {                                         // 2. Check if it exists
  data = JSON.parse(saved);                          // 3. Parse JSON and overwrite your array
}

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

    // Notes listener
    const notesCell = tr.cells[3];
    notesCell.addEventListener("input", (e) => {
      row.notes = e.target.textContent; // update correct row
      saveData();
    });
  });
}

function saveData() {
  localStorage.setItem("dashboardData", JSON.stringify(data));
}

// initial load
renderTable(data);

function filterData() {
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;
  const location = document.getElementById("location").value.toLowerCase();
  const name = document.getElementById("name").value.toLowerCase();

  const filtered = data.filter(row => {
    const rowDate = new Date(row.date); // <-- convert to Date
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;

    const matchesDate = (!from || rowDate >= from) && (!to || rowDate <= to);
    const matchesLocation = !location || row.location.toLowerCase().includes(location);
    const matchesName = !name || row.name.toLowerCase().includes(name);

    return matchesDate && matchesLocation && matchesName;
  });

  renderTable(filtered);
}

document.getElementById("csvUpload").addEventListener("change", handleCSVUpload);

function handleCSVUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    parseCSV(text);
  };
  reader.readAsText(file);
}

function parseCSV(csvText) {
  const lines = csvText.split("\n").filter(Boolean);
  const headers = lines.shift().split(",");
  const newData = lines.map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = values[i].trim());
    return obj;
  });
  
  data = newData; // replace existing data array
  renderTable(data);
  saveData(); // optionally save to localStorage
}