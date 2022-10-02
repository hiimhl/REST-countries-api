import { atom } from "recoil";

export const themeAtom = atom({
  key: "isDark",
  default: false,
});

export const regionAtom = atom({
  key: "region",
  default: "Asia",
});
