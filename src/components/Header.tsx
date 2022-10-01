import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { themeAtom } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

const MyHeader = styled.header`
  width: 100%;
  height: 8vh;
  -webkit-box-shadow: 5px 3px 15px 3px ${(props) => props.theme.shadowColor};
  box-shadow: 5px 3px 15px 3px ${(props) => props.theme.shadowColor};
`;
const Wrapper = styled.div`
  width: 90%;
  height: 8vh;
  max-width: 1440px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: 800;
  }
  button {
    border: none;
    background-color: transparent;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: center;
    color: ${(props) => props.theme.textColor};

    /* icon */
    svg {
      margin-right: 7px;
      margin-top: 1px;
    }
  }
`;

function Header() {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const onClickTheme = () => setTheme((curr) => !curr);

  return (
    <MyHeader>
      <Wrapper>
        <h1>Where in the _world?</h1>

        {theme ? (
          <button onClick={onClickTheme}>
            <FontAwesomeIcon icon={faSun} />
            Light Mode
          </button>
        ) : (
          <button onClick={onClickTheme}>
            <FontAwesomeIcon icon={faMoon} />
            Dark Mode
          </button>
        )}
      </Wrapper>
    </MyHeader>
  );
}

export default Header;
