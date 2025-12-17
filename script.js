const fileInput = document.getElementById("csvFileInput");
const output = document.getElementById("tableContainer");
const editBtn = document.getElementById("editBtn");

let isEditable = false;

fileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    displayCSV(text);
  };

  reader.readAsText(file);
});

function displayCSV(csvText) {
  const rows = csvText.trim().split("\n");

  let table = document.createElement("table");
  table.border = "1";

  rows.forEach((row, index) => {
    const tr = document.createElement("tr");
    const cells = row.split(",");

    cells.forEach(cell => {
      const cellElement = index === 0
        ? document.createElement("th")
        : document.createElement("td");

      cellElement.textContent = cell;
      if (cellElement.tagName === "TD") {
        cellElement.contentEditable = false;
        }
      tr.appendChild(cellElement);
    });

    table.appendChild(tr);
  });

  output.innerHTML = "";
  output.appendChild(table);
}

editBtn.addEventListener("click", () => {
  const table = output.querySelector("table");
  if (!table) return;

  isEditable = !isEditable;

  const cells = table.querySelectorAll("td");

  cells.forEach(cell => {
    cell.contentEditable = isEditable;
  });

  editBtn.textContent = isEditable ? "Stop Editing" : "Edit Table";
});
