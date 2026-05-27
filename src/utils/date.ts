const shortFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const longFormatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatShortDate = (value: string) =>
  shortFormatter.format(new Date(value));

export const formatLongDate = (value: string) =>
  longFormatter.format(new Date(value));

export const toInputDate = (value = new Date()) =>
  new Date(value).toISOString().slice(0, 10);
