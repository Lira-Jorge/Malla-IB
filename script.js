
const materias = [{"clave": "IPP-24", "nombre": "Identidades Personal y Profesional", "semestre": 1, "creditos": 4}, {"clave": "CD-24", "nombre": "Cultura Digital", "semestre": 1, "creditos": 4}, {"clave": "I101", "nombre": "Inglés I", "semestre": 1, "creditos": 4}, {"clave": "DS104", "nombre": "Cálculo Diferencial e Integral", "semestre": 1, "creditos": 6}, {"clave": "DS105", "nombre": "Física General", "semestre": 1, "creditos": 6}, {"clave": "IB106", "nombre": "Química Básica", "semestre": 1, "creditos": 6}, {"clave": "IB107", "nombre": "Biología Celular y Molecular", "semestre": 1, "creditos": 6}, {"clave": "IB108", "nombre": "Álgebra Superior", "semestre": 1, "creditos": 6}, {"clave": "IIG-24", "nombre": "Interculturalidades, Inclusión y Género", "semestre": 2, "creditos": 4}, {"clave": "ERS-24", "nombre": "Ecologización y Responsabilidad Social", "semestre": 2, "creditos": 4}, {"clave": "I201", "nombre": "Inglés II", "semestre": 2, "creditos": 4, "prerequisitos": ["I101"]}, {"clave": "DS214", "nombre": "Cálculo Vectorial", "semestre": 2, "creditos": 6, "prerequisitos": ["DS104"]}, {"clave": "IB215", "nombre": "Mecánica", "semestre": 2, "creditos": 6, "prerequisitos": ["DS105"]}, {"clave": "IB216", "nombre": "Química Orgánica", "semestre": 2, "creditos": 6, "prerequisitos": ["IB106"]}, {"clave": "IB207", "nombre": "Anatomía", "semestre": 2, "creditos": 6}, {"clave": "DS218", "nombre": "Álgebra Lineal", "semestre": 2, "creditos": 6, "prerequisitos": ["IB108"]}, {"clave": "IB301", "nombre": "Métodos Numéricos", "semestre": 3, "creditos": 6, "prerequisitos": ["DS314"]}, {"clave": "IB302", "nombre": "Programación para Ingenieros", "semestre": 3, "creditos": 6}, {"clave": "I301", "nombre": "Inglés III", "semestre": 3, "creditos": 4, "prerequisitos": ["I201"]}, {"clave": "DS314", "nombre": "Ecuaciones Diferenciales Ordinarias", "semestre": 3, "creditos": 6, "prerequisitos": ["DS214"]}, {"clave": "IB315", "nombre": "Termodinámica", "semestre": 3, "creditos": 6, "prerequisitos": ["IB215"]}, {"clave": "IB316", "nombre": "Bioquímica", "semestre": 3, "creditos": 6, "prerequisitos": ["IB216", "IB107"]}, {"clave": "IB317", "nombre": "Biofísica", "semestre": 3, "creditos": 6, "prerequisitos": ["DS105", "IB107"]}, {"clave": "DS318", "nombre": "Electricidad y Magnetismo", "semestre": 3, "creditos": 6, "prerequisitos": ["DS214"]}, {"clave": "IB401", "nombre": "Bases de Datos y Big Data", "semestre": 4, "creditos": 6}, {"clave": "IB412", "nombre": "Lenguajes de Programación", "semestre": 4, "creditos": 6, "prerequisitos": ["IB302"]}, {"clave": "I401", "nombre": "Inglés IV", "semestre": 4, "creditos": 4, "prerequisitos": ["I301"]}, {"clave": "IB414", "nombre": "Análisis de Circuitos CD", "semestre": 4, "creditos": 6, "prerequisitos": ["DS318", "IB301"]}, {"clave": "IB415", "nombre": "Sistemas Digitales", "semestre": 4, "creditos": 6, "prerequisitos": ["DS318"]}, {"clave": "IB406", "nombre": "Acústica y Óptica", "semestre": 4, "creditos": 6}, {"clave": "IB417", "nombre": "Fisiología I", "semestre": 4, "creditos": 6, "prerequisitos": ["IB316", "IB317", "IB207"]}, {"clave": "IB408", "nombre": "Bioestadística", "semestre": 4, "creditos": 6}, {"clave": "IB511", "nombre": "Instrumentación", "semestre": 5, "creditos": 6, "prerequisitos": ["IB414"]}, {"clave": "IB512", "nombre": "Sistemas Analógicos", "semestre": 5, "creditos": 6, "prerequisitos": ["IB414"]}, {"clave": "IB513", "nombre": "Inglés Técnico Conversacional", "semestre": 5, "creditos": 4, "prerequisitos": ["I401"]}, {"clave": "IB514", "nombre": "Análisis de Circuitos CA", "semestre": 5, "creditos": 6, "prerequisitos": ["IB414"]}, {"clave": "IB515", "nombre": "Microprocesadores y Microcontroladores", "semestre": 5, "creditos": 6, "prerequisitos": ["IB412", "IB414", "IB415"]}, {"clave": "IB506", "nombre": "Histología", "semestre": 5, "creditos": 6, "prerequisitos": ["IB107"]}, {"clave": "IB517", "nombre": "Fisiología II", "semestre": 5, "creditos": 6, "prerequisitos": ["IB417"]}, {"clave": "IBOP508", "nombre": "Optativa 1", "semestre": 5, "creditos": 6}];

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
