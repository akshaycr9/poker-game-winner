const isProd = import.meta.env.PROD;
const baseURL = import.meta.env.BASE_URL;

export const routePath = (route: string) => {
  return isProd ? `${baseURL}${route}` : `/${route}`;
};
