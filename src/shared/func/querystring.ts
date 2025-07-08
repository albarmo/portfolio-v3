export default function qs(
  params: { [key: string]: string } | Object | any
): string {
  if (!params) return "";

  const queryString = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      queryString.append(key, params[key]);
    }
  });

  return `?${queryString.toString()}`;
}
