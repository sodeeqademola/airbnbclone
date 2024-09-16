import countries from "world-countries";
export const Countries = () => {
  const countriesFormat = countries.map((country) => {
    return {
      value: country.cca2,
      name: country.name.common,
      flag: country.flag,
      latLang: country.latlng,
      region: country.region,
    };
  });
  return countriesFormat;
};
