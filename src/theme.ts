import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  textColor: "hsl(0, 0%, 100%)",
  bgColor: "hsl(207, 26%, 17%)",
  elementsColor: "hsl(209, 23%, 22%)",
  inputColor: "hsl(0, 0%, 100%)",
  shadowColor: "5px 3px 15px 3px rgba(0, 0, 0, 0.1)",
};

export const lightTheme: DefaultTheme = {
  textColor: "hsl(200, 15%, 8%)",
  bgColor: "hsl(0, 0%, 98%)",
  elementsColor: "hsl(0, 0%, 100%)",
  inputColor: "hsl(0, 0%, 52%)",
  shadowColor: "5px 3px 15px 3px #e7e7e7",
};
