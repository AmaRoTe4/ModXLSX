export function formatarFecha(fechaString: string) {
  const fecha = new Date(fechaString);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  //@ts-ignore
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
  return fechaFormateada;
}

export function formatDate(dateString: string): string {
  const [day, month, year] = dateString.split("/").map(Number);
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedYear = year.toString();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

export function formatTime(timeString: string): string {
  let [hours, minutes, seconds]: any = timeString.split(":");

  hours = Number(hours);
  minutes = Number(minutes);
  const [, me] = seconds?.split(" ");
  if (me === "PM") hours += 12;

  const formattedHours =
    hours.toString().length === 1
      ? hours.toString().padStart(2, "0")
      : hours.toString();
  const formattedMinutes =
    minutes.toString().length === 1
      ? minutes.toString().padStart(2, "0")
      : minutes.toString();

  return `${formattedHours}:${formattedMinutes}`;
}

export const getCurrentDateTimeLocal = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // Formato compatible con datetime-local: "YYYY-MM-DDTHH:MM"
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
