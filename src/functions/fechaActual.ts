export const fechaActual = () => {
  let fechaActual = new Date();

  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;
  let año = fechaActual.getFullYear();
  let horas = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();

  return {
    fecha:
      año +
      "/" +
      mes.toString().padStart(2, "0") +
      "/" +
      dia.toString().padStart(2, "0"),
    hora:
      horas.toString().padStart(2, "0") +
      ":" +
      minutos.toString().padStart(2, "0"),
  };
};

export function getFirstAndLastDayOfMonth(): {
  firstDay: string;
  lastDay: string;
} {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .slice(0, 10);

  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .slice(0, 10);

  return { firstDay, lastDay };
}

export const fechaActualSearch = () =>
  fechaActual().fecha.replace("/", "-").replace("/", "-");

export function calcularTiempoTranscurrido(fechaDada: string) {
  let partes = fechaDada.split(/[/ :]/);
  if (partes.length !== 6) {
    throw new Error("El formato de la fecha debe ser 'DD/MM/YYYY HH:mm:ss'");
  }

  if (partes[0].length !== 2) {
    let aux = partes[0];
    partes[0] = partes[2];
    partes[2] = aux;
  }

  const fecha = new Date(
    parseInt(partes[2], 10),
    parseInt(partes[1], 10) - 1,
    parseInt(partes[0], 10),
    parseInt(partes[3], 10),
    parseInt(partes[4], 10),
    parseInt(partes[5], 10)
  );

  const ahora = new Date();

  const diferencia = ahora.getTime() - fecha.getTime();

  if (diferencia < 0) {
    throw new Error("La fecha dada está en el futuro.");
  }

  const horas = Math.floor(diferencia / (1000 * 60 * 60));
  const minutos = Math.floor(diferencia / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  return { minutos: minutos % 60, segundos, horas: horas > 0 ? horas : 0 };
}
