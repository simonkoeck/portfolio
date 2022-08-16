export async function getMany(
  collection: string,
  locale: string
): Promise<any> {
  const r = fetch(
    `${process.env.STRAPI_BASE_URL}/${collection}?locale=${locale}`
  );
  return await (await r).json();
}

export async function getSingleType(type: string, lang: string) {
  const r = fetch(`${process.env.STRAPI_BASE_URL}/${type}?locale=${lang}`);
  return (await (await r).json()).data.attributes;
}
