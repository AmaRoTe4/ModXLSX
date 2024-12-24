const completoTo0 = (value: string) => {
  if (value.length === 1) return `0${value}`;
  return value;
};

export function viewDate(fechaStr: string) {
  const fechaObj = new Date(fechaStr);

  const dia = fechaObj.getDate();
  const mes = fechaObj.getMonth() + 1;
  const anio = fechaObj.getFullYear();

  const fechaLegible = `${completoTo0(dia.toString())}/${completoTo0(
    mes.toString()
  )}/${anio}`;

  return fechaLegible;
}

export function viewDateToHours(fechaStr: string) {
  const fechaObj = new Date(fechaStr);

  const dia = fechaObj.getDate();
  const mes = fechaObj.getMonth() + 1;
  const anio = fechaObj.getFullYear();
  const hora = fechaObj.getHours();
  const min = fechaObj.getMinutes();
  const sec = fechaObj.getSeconds();

  const fechaLegible = `${completoTo0(dia.toString())}/${completoTo0(
    mes.toString()
  )}/${anio} ${completoTo0(hora.toString())}:${completoTo0(
    min.toString()
  )}:${completoTo0(sec.toString())}`;

  return fechaLegible;
}

//pasa de 11-11-11 (mm/dd/aaaa) a 11/11/11 (dd/mm/aaaa)
export function viewDateTransfor(fechaStr: string) {
  const datos = fechaStr.split("-");
  const [anio, mes, dia] = datos;
  return `${completoTo0(dia)}/${completoTo0(mes)}/${anio}`;
}
