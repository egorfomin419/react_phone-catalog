export const BASE_URL = `${import.meta.env.BASE_URL}api`;

export const getImageUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}${path}`;
};
