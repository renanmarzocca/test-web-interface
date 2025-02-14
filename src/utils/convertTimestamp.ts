export const formatTimestamp = (timestamp: number | string): string => {
  const parsedTimestamp = Number(timestamp); // Ensure it's a number

  if (!parsedTimestamp || isNaN(parsedTimestamp)) return "Invalid Date"; // Safety check

  const date = new Date(parsedTimestamp);
  const formattedDate = date.toLocaleDateString("pt-BR"); // Format to DD/MM/YYYY
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};
