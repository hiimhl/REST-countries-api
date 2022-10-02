// api, interface

// import { useRecoilValue } from "recoil";
import { regionAtom } from "./atom";

const URL = `https://restcountries.com/v3.1`;

// const rigion = useRecoilValue(regionAtom);

export interface ICounty {
  name: {
    common: string;
    nativeName: string;
  };
  population: number;
  region: string;
  subregion: string;
  currencies: string;
  borders?: [string];
  languages: string;
  capital: [string];
  flags: {
    png: string;
    svg: string;
  };
}

export const countiesFetch = () => {
  return fetch(`${URL}/all`).then((res) => res.json());
};

// export const regionFetch = () => {
//   return fetch(`${URL}/rigion/${rigion}`);
// };
