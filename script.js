
const materias = [
  { clave: "DS104", nombre: "Cálculo Diferencial e Integral", semestre: 1, creditos: 6 },
  { clave: "IB107", nombre: "Biología Celular y Molecular", semestre: 1, creditos: 6 },
  { clave: "IB316", nombre: "Bioquímica", semestre: 3, creditos: 6, prerequisitos: ["IB107"] },
  { clave: "IB417", nombre: "Fisiología I", semestre: 4, creditos: 6, prerequisitos: ["IB316"] },
  { clave: "IB517", nombre: "Fisiología II", semestre: 5, creditos: 6, prerequisitos: ["IB417"] },
];

function crearTabla() {
  const container = document.getElementById("tabla-container");
  const tabla = document.createElement("table");
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Semestre</th>
        <th>Clave</th>
        <th>Materia</th>
        <th>Créditos</th>
        <th>Prerrequisitos</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody id="tabla-body"></tbody>
  `;
  container.appendChild(tabla);
  actualizarTabla();
}

function actualizarTabla() {
  const body = document.getElementById("tabla-body");
  body.innerHTML = "";
  let total = 0;

  materias.forEach((m) => {
    const tr = document.createElement("tr");
    const estado = localStorage.getItem(m.clave) || "pendiente";

    const prereqCompletos = (m.prerequisitos || []).every(
      (p) => localStorage.getItem(p) === "aprobada"
    );

    const bloqueado = (m.prerequisitos || []).length > 0 && !prereqCompletos;

    if (estado === "aprobada") total += m.creditos;

    const estadoSelect = document.createElement("select");
    ["pendiente", "en curso", "aprobada"].forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
      if (estado === opt) option.selected = true;
      estadoSelect.appendChild(option);
    });

    estadoSelect.disabled = bloqueado;
    estadoSelect.addEventListener("change", () => {
      localStorage.setItem(m.clave, estadoSelect.value);
      actualizarTabla();
    });

    tr.innerHTML = `
      <td>${m.semestre}</td>
      <td>${m.clave}</td>
      <td>${m.nombre}</td>
      <td>${m.creditos}</td>
      <td>${(m.prerequisitos || []).join(", ") || "–"}</td>
    `;
    const tdEstado = document.createElement("td");
    tdEstado.appendChild(estadoSelect);
    tr.appendChild(tdEstado);
    body.appendChild(tr);
  });

  document.getElementById("creditos").textContent =
    "Créditos aprobados: " + total;
}

window.addEventListener("DOMContentLoaded", crearTabla);
