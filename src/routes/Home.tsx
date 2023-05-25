import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { countriesFetch, ICountry } from "../data/api";
import Card from "../components/Card";
import { useRecoilState } from "recoil";
import { regionAtom } from "../data/atom";

const Wrapper = styled.div`
  width: 90%;
  height: 92vh;
  max-width: 1440px;
  margin: auto;
`;
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 12vh;
  justify-content: space-between;
  align-items: center;
`;
const InputForm = styled.form`
  background-color: ${(props) => props.theme.elementsColor};
  color: ${(props) => props.theme.inputColor};
  border-radius: 5px;

  -webkit-box-shadow: ${(props) => props.theme.shadowColor};
  box-shadow: ${(props) => props.theme.shadowColor};

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding-left: 15px;

    svg {
      font-size: 17px;
      color: ${(props) => props.theme.inputColor};
    }
  }
  input {
    padding: 10px;
    width: 30rem;
    height: 2.7rem;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.elementsColor};
    color: ${(props) => props.theme.textColor};

    &:focus {
      outline: none;
    }
  }
`;
const SelectForm = styled(InputForm)`
  label {
    cursor: pointer;
    padding: 10px 25px;
  }
  select {
    margin-top: 3px;
    background-color: ${(props) => props.theme.elementsColor};
    color: ${(props) => props.theme.textColor};
    &:focus {
      outline: none;
    }

    cursor: pointer;
    padding: 10px 25px;
    border: none;
    border-radius: 5px;
  }
`;
const MyUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 22% 22% 22% 22%;
  justify-content: space-between;

  /* tablet */
  @media (max-width: 820px) {
    grid-template-columns: 30% 30% 30%;
  }
`;

function Home() {
  const { data, isLoading } = useQuery<ICountry[]>(
    ["counties", "nowCounties"],
    countriesFetch
  );

  const [category, setCategory] = useRecoilState(regionAtom);
  const [inputValue, setInput] = useState("");
  const onFliterHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const showList = () => {
    const filterState = data!.filter(
      (country: ICountry) => country.region === category
    );
    if (category === "all") {
      return data!.map((country: ICountry) => (
        <Card key={country.name.common} data={country} />
      ));
    } else {
      return filterState.map((country: ICountry) => (
        <Card key={country.name.common} data={country} />
      ));
    }
  };

  return (
    <Wrapper>
      <SearchContainer>
        <InputForm>
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            value={inputValue}
            onChange={onInputHandler}
            placeholder="Search for a country..."
          />
        </InputForm>
        <SelectForm>
          <select onInput={onFliterHandler}>
            <option value="all" defaultChecked hidden>
              Filter by Region
            </option>
            <option value="all">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </SelectForm>
      </SearchContainer>
      <MyUl>{isLoading ? <p>"is.. loading..."</p> : showList()}</MyUl>
    </Wrapper>
  );
}

export default Home;
