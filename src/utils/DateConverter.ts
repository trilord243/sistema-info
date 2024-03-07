interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export function formatTimestampToDate({ seconds }: Timestamp): string {
  const date = new Date(seconds * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}
