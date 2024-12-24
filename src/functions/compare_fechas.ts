export function obtenerFechaMasVieja(fechas: string[]): string {
  // Convertir las fechas ISO a objetos Date
  const fechasConvertidas = fechas.map((fecha) => new Date(fecha));

  // Encontrar la fecha más antigua (la de menor valor en milisegundos)
  const fechaMasVieja = new Date(
    Math.min(...fechasConvertidas.map((fecha) => fecha.getTime()))
  );

  // Formatear la fecha más vieja a formato DD/MM/YYYY HH:mm:ss
  const dia = fechaMasVieja.getDate().toString().padStart(2, "0");
  const mes = (fechaMasVieja.getMonth() + 1).toString().padStart(2, "0");
  const año = fechaMasVieja.getFullYear();
  const horas = fechaMasVieja.getHours().toString().padStart(2, "0");
  const minutos = fechaMasVieja.getMinutes().toString().padStart(2, "0");
  const segundos = fechaMasVieja.getSeconds().toString().padStart(2, "0");

  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}
