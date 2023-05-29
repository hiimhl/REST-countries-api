import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { countriesFetch, ICountry } from "../data/api";
import Card from "../components/Card";
import { useRecoilState } from "recoil";
import { formAtom, regionAtom } from "../data/atom";
import { animateScroll as scroll } from "react-scroll";

const Wrapper = styled.div`
  width: 90%;
  height: 92vh;
  max-width: 1440px;
  margin: auto;

  /* mobile */
  @media screen and (max-width: 428px) {
    width: 80%;
  }
`;
const FilterContainer = styled.form`
  display: flex;
  width: 100%;
  height: 12vh;
  justify-content: space-between;
  align-items: center;

  /* Mobile */
  @media screen and (max-width: 768px) {
    margin: 50px 0;
    max-width: none;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  background-color: ${(props) => props.theme.elementsColor};
  color: ${(props) => props.theme.inputColor};
  border-radius: 5px;
  width: 70%;
  max-width: 700px;
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
    width: 70%;
    padding: 15px 10px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.elementsColor};
    color: ${(props) => props.theme.textColor};

    &:focus {
      outline: none;
    }
  }
  /* Mobile */
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const RegionOption = styled(SearchBar)`
  width: 25%;
  max-width: 250px;
  select {
    width: 100%;
    margin-top: 3px;
    background-color: ${(props) => props.theme.elementsColor};
    color: ${(props) => props.theme.textColor};

    cursor: pointer;
    padding: 15px 25px;
    border: none;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }
  /* Mobile */
  @media screen and (max-width: 768px) {
    width: 50%;
    min-width: 170px;
  }
`;
const MyUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 21%);
  justify-content: space-between;

  /* tablet */
  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(3, 28%);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 45%);
  }
  /* mobile */
  @media screen and (max-width: 428px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const UpButton = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 40px;
  right: 40px;
  border: 2px solid ${(props) => props.theme.inputColor};
  background-color: ${(props) => props.theme.elementsColor};
  border-radius: 50%;

  /* icon */
  svg {
    color: ${(props) => props.theme.inputColor};
    margin: 5px 3px;
    font-size: 15px;
  }
`;

const SearchMessage = styled.span`
  b {
    font-size: 16px;
    font-weight: 700;
  }
`;

function Home() {
  const { data, isLoading } = useQuery<ICountry[]>(
    ["counties", "nowCounties"],
    countriesFetch
  );

  const [category, setCategory] = useRecoilState(regionAtom);
  const [searchData, setSearchData] = useState("");
  const [filterdData, setFilterdData] = useState<ICountry[]>();

  const onFliterHandler = (event: React.FormEvent<HTMLSelectElement>) =>
    setCategory(event.currentTarget.value);
  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchData(value.toUpperCase());
  };

  const onGoTop = () => scroll.scrollToTop();
  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (filterdData?.length === 0) {
      console.log("Can't find the " + searchData);
    }
    setSearchData("");
  };

  // Print the Country list
  useEffect(() => {
    if (category === "all") {
      return setFilterdData(data);
    } else if (searchData.length > 0) {
      const search = data?.filter((country: ICountry) =>
        country.name.common.toUpperCase().includes(searchData)
      );
      return setFilterdData(search);
    } else if (category !== "all") {
      const categoryFilter = filterdData?.filter(
        (country: ICountry) => country.region === category
      );
      return setFilterdData(categoryFilter);
    }
  }, [searchData, data, category]);

  return (
    <Wrapper>
      <FilterContainer>
        <SearchBar>
          <button type="submit" onClick={onSubmit}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            value={searchData}
            onChange={onSearchHandler}
            placeholder="Search for a country..."
          />
        </SearchBar>
        <RegionOption>
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
        </RegionOption>
      </FilterContainer>
      <UpButton onClick={onGoTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </UpButton>
      <MyUl>
        {isLoading ? (
          <p>"is.. loading..."</p>
        ) : (
          filterdData?.map((country: ICountry) => (
            <Card key={country.name.common} data={country} />
          ))
        )}
        {filterdData?.length === 0 && (
          <SearchMessage>
            Can't find <b>{searchData}</b>
          </SearchMessage>
        )}
      </MyUl>
    </Wrapper>
  );
}

export default Home;
