export function formatDate(date: string): string {
  const formattedDate = new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

  return formattedDate;
}
