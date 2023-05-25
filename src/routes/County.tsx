import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;
const Content = styled.div`
  img {
    width: 500px;
  }
`;
const Ul = styled.ul`
  display: grid;
`;
const BorderUl = styled.ul``;

interface ILang {
  nativeName: string;
  currencies: [
    {
      code: string;
      symbol: string;
    }
  ];
  borders: [];
}

function County() {
  const params = useParams();
  const navigate = useNavigate();
  const paramsID = params.id;

  //Location - Navegate로 보낸 id와 date 받기
  const location = useLocation();
  const state = location.state as { id: string; data: any };
  const countyId = state.id;
  const data = state.data;

  const languagesFetch = () => {
    return fetch(`https://restcountries.com/v2/name/${paramsID}`).then((res) =>
      res.json()
    );
  };

  //
  const { data: langData, isLoading } = useQuery<ILang>(
    ["lang", "lang"],
    languagesFetch
  );
  // console.log(langData);

  return (
    <Wrapper>
      <button onClick={() => navigate("/")}>Back</button>
      <Content>
        <img src={data.flags.svg} alt={countyId} />
        <div>
          <h3>{countyId}</h3>
          <ul>
            <li>
              <b>Native Name:</b>
              {langData?.nativeName}
            </li>
            <li>
              <b>Population:</b> {data.population}
            </li>
            <li>
              <b>Region:</b> {data.region}
            </li>
            <li>
              <b>Currencies:</b>
            </li>
            <li>
              <b>Top Level Domain:</b> {data.tld}
            </li>
          </ul>
          <ul>
            <h4>Border Countries:</h4>
            <li>France</li>
          </ul>
        </div>
      </Content>
    </Wrapper>
  );
}

export default County;
