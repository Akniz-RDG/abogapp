const form = document.getElementById("clienteForm");
const ul = document.getElementById("clientesUl");

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
  manejarNavegacion();
});

// Guardar cliente
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente = {
    id: Date.now(),
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    telefono: document.getElementById("telefono").value,
    materia: document.getElementById("materia").value,
    honorarios: parseInt(document.getElementById("honorarios").value),
    estado: document.getElementById("estado").value,
    comentarios: document.getElementById("comentarios").value,
  };

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  clientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  mostrarCliente(cliente);
  form.reset();
});

// Mostrar cliente visualmente
function mostrarCliente(cliente) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${cliente.nombre}</strong> | ${cliente.materia} | <em>${cliente.estado}</em>
    <span>
      <button class="editar">✏️</button>
      <button class="eliminar">🗑️</button>
    </span>
  `;

  ul.appendChild(li);

  li.querySelector(".eliminar").addEventListener("click", () => {
    eliminarCliente(cliente.id, li);
  });

  li.querySelector(".editar").addEventListener("click", () => {
    editarCliente(cliente.id);
    li.remove();
  });
}

// Cargar todos los clientes
function cargarClientes() {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  clientes.forEach(mostrarCliente);
}

// Eliminar cliente
function eliminarCliente(id, elemento) {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  clientes = clientes.filter((c) => c.id !== id);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  elemento.remove();
}

// Editar cliente
function editarCliente(id) {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((c) => c.id === id);

  document.getElementById("nombre").value = cliente.nombre;
  document.getElementById("correo").value = cliente.correo;
  document.getElementById("telefono").value = cliente.telefono;
  document.getElementById("materia").value = cliente.materia;
  document.getElementById("honorarios").value = cliente.honorarios;
  document.getElementById("estado").value = cliente.estado;
  document.getElementById("comentarios").value = cliente.comentarios;

  eliminarCliente(id);
}

const expedienteForm = document.getElementById("expedienteForm");
const expedienteUl = document.getElementById("expedientesUl");
const selectCliente = document.getElementById("clienteExp");

// Mostrar clientes en el selector
function cargarClientesEnSelect() {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  selectCliente.innerHTML = '<option value="">Seleccionar cliente</option>';
  clientes.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nombre;
    selectCliente.appendChild(opt);
  });
}

// Evento para guardar expediente
expedienteForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const expediente = {
    id: Date.now(),
    titulo: document.getElementById("tituloExp").value,
    rol: document.getElementById("rolExp").value,
    materia: document.getElementById("materiaExp").value,
    clienteId: parseInt(selectCliente.value),
    estado: document.getElementById("estadoExp").value,
    abogados: document.getElementById("abogadosExp").value,
  };

  const expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  expedientes.push(expediente);
  localStorage.setItem("expedientes", JSON.stringify(expedientes));
  mostrarExpediente(expediente);
  expedienteForm.reset();
});

// Mostrar expediente
function mostrarExpediente(exp) {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find(c => c.id === exp.clienteId);
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${exp.titulo}</strong> (${exp.rol})<br>
    Materia: ${exp.materia} | Estado: <em>${exp.estado}</em><br>
    Cliente: ${cliente ? cliente.nombre : 'Desconocido'}<br>
    Abogado(s): ${exp.abogados}
    <span>
      <button class="editar">✏️</button>
      <button class="eliminar">🗑️</button>
    </span>
  `;

  expedienteUl.appendChild(li);

  li.querySelector(".eliminar").addEventListener("click", () => {
    eliminarExpediente(exp.id, li);
  });

  li.querySelector(".editar").addEventListener("click", () => {
    editarExpediente(exp.id);
    li.remove();
  });
}

function eliminarExpediente(id, elemento) {
  let expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  expedientes = expedientes.filter((e) => e.id !== id);
  localStorage.setItem("expedientes", JSON.stringify(expedientes));
  elemento.remove();
}

function editarExpediente(id) {
  const expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  const exp = expedientes.find(e => e.id === id);

  document.getElementById("tituloExp").value = exp.titulo;
  document.getElementById("rolExp").value = exp.rol;
  document.getElementById("materiaExp").value = exp.materia;
  document.getElementById("estadoExp").value = exp.estado;
  document.getElementById("abogadosExp").value = exp.abogados;
  selectCliente.value = exp.clienteId;

  eliminarExpediente(id);
}

// Cargar expedientes existentes
function cargarExpedientes() {
  const expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  expedientes.forEach(mostrarExpediente);
}

window.addEventListener("DOMContentLoaded", () => {
  cargarClientesEnSelect();
  cargarExpedientes();
});

// menú de tareas

const tareaForm = document.getElementById("tareaForm");
const tareasUl = document.getElementById("tareasUl");
const selectExpediente = document.getElementById("expedienteTarea");

// Cargar expedientes en selector
function cargarExpedientesEnSelect() {
  const expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  selectExpediente.innerHTML = '<option value="">Seleccionar expediente</option>';

  expedientes.forEach((e) => {
    const cliente = clientes.find(c => c.id === e.clienteId);
    const clienteNombre = cliente ? cliente.nombre : 'Cliente desconocido';

    const opt = document.createElement("option");
    opt.value = e.id;
    opt.textContent = `${e.titulo} (${clienteNombre})`;

    selectExpediente.appendChild(opt);
  });
}


// Guardar tarea
tareaForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const fechaInicio = document.getElementById("fechaInicioTarea").value;
  const fechaTermino = document.getElementById("fechaTerminoTarea").value;

  // Validación
  if (fechaInicio && fechaTermino && fechaTermino < fechaInicio) {
    alert("⚠️ La fecha de término no puede ser anterior a la de inicio.");
    return;
  }

  const tarea = {
    id: Date.now(),
    titulo: document.getElementById("tituloTarea").value,
    expedienteId: parseInt(selectExpediente.value),
    descripcion: document.getElementById("descripcionTarea").value,
    abogado: document.getElementById("abogadoTarea").value,
    estado: document.getElementById("estadoTarea").value,
    prioridad: document.getElementById("prioridadTarea").value,
    fechaInicio,
    fechaTermino
  };

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTarea(tarea);
  tareaForm.reset();
});

// Mostrar tarea
function mostrarTarea(tarea) {
  const expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  const exp = expedientes.find(e => e.id === tarea.expedienteId);

  const li = document.createElement("li");

  // Aquí construimos el contenido del <li>
  li.innerHTML = `
    <strong>${tarea.titulo}</strong> | ${tarea.prioridad.toUpperCase()} | <em>${tarea.estado}</em><br>
    Abogado: ${tarea.abogado}<br>
    Expediente: ${exp ? exp.titulo : 'Desconocido'}<br>
    ${tarea.descripcion}<br>
    <strong>Inicio:</strong> ${tarea.fechaInicio || 'No definido'} |
    <strong>Término:</strong> ${tarea.fechaTermino || 'No definido'}<br>
    <span>
      <button class="editar">✏️</button>
      <button class="eliminar">🗑️</button>
    </span>
  `;

  // Insertamos la tarea en la lista visual
  tareasUl.appendChild(li);

  // Botones funcionales
  li.querySelector(".eliminar").addEventListener("click", () => {
    eliminarTarea(tarea.id, li);
  });

  li.querySelector(".editar").addEventListener("click", () => {
    editarTarea(tarea.id);
    li.remove(); // Borra visualmente la vieja versión para evitar duplicado
  });
}

// Navegación por pestañas
document.querySelectorAll(".sidebar a").forEach(enlace => {
  enlace.addEventListener("click", e => {
    e.preventDefault();
    const tabId = e.target.dataset.tab;

    // Ocultar todas las secciones
    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.remove("visible");
    });

    // Mostrar la seleccionada
    document.getElementById(tabId).classList.add("visible");

    // QUITAR clase active de todos
    document.querySelectorAll(".sidebar a").forEach(link => {
      link.classList.remove("active");
    });

    // AGREGAR clase active al actual
    e.target.classList.add("active");

    // Refrescar selects según sección
    if (tabId === "expedientes") cargarClientesEnSelect();
    if (tabId === "tareas") cargarExpedientesEnSelect();
  });
});

// Dashboard

function actualizarDashboard() {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const expedientes = JSON.parse(localStorage.getItem("expedientes")) || [];
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  document.getElementById("totalClientes").textContent = clientes.length;
  document.getElementById("totalExpedientes").textContent = expedientes.length;
  document.getElementById("totalTareas").textContent = tareas.length;

  const urgentes = tareas.filter(t => t.prioridad === "urgente");
  document.getElementById("tareasUrgentes").textContent = urgentes.length;

  // Gráfico simple de tareas por estado
  const conteoPorEstado = {
    "no iniciado": 0,
    "en proceso": 0,
    "terminado": 0
  };

  tareas.forEach(t => {
    if (conteoPorEstado[t.estado] !== undefined) {
      conteoPorEstado[t.estado]++;
    }
  });

  // Si ya había un gráfico, lo destruye
  if (window.grafico) window.grafico.destroy();

  window.grafico = new Chart(document.getElementById("graficoTareas"), {
    type: "bar",
    data: {
      labels: ["No iniciado", "En proceso", "Terminado"],
      datasets: [{
        label: "Tareas",
        data: [
          conteoPorEstado["no iniciado"],
          conteoPorEstado["en proceso"],
          conteoPorEstado["terminado"]
        ],
        backgroundColor: ["#ffc107", "#17a2b8", "#28a745"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Ejecutar al entrar al dashboard
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    const tabId = e.target.dataset.tab;
    if (tabId === "dashboard") actualizarDashboard();
  });
});

// También al cargar
window.addEventListener("DOMContentLoaded", () => {
  actualizarDashboard();
});

// Utilidades: Exportar datos
document.getElementById("btnExportar").addEventListener("click", () => {
  const datos = {
    clientes: JSON.parse(localStorage.getItem("clientes")) || [],
    expedientes: JSON.parse(localStorage.getItem("expedientes")) || [],
    tareas: JSON.parse(localStorage.getItem("tareas")) || []
  };

  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "abogapp-backup.json";
  enlace.click();
});

// Utilidades: Importar datos
document.getElementById("importadorJson").addEventListener("change", function () {
  const archivo = this.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function (e) {
    try {
      const datos = JSON.parse(e.target.result);
      if (datos.clientes && datos.expedientes && datos.tareas) {
        localStorage.setItem("clientes", JSON.stringify(datos.clientes));
        localStorage.setItem("expedientes", JSON.stringify(datos.expedientes));
        localStorage.setItem("tareas", JSON.stringify(datos.tareas));
        alert("✅ Datos importados correctamente. Refresca la página para ver los cambios.");
      } else {
        alert("⚠️ El archivo no tiene el formato esperado.");
      }
    } catch (err) {
      alert("❌ Error al leer el archivo.");
    }
  };
  lector.readAsText(archivo);
});
