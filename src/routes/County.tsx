import React from "react";
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

function County() {
  const id = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as { id: string; data: any };
  const countyId = state.id;
  const data = state.data;
  console.log(data);
  const name = Object.keys(data.name.nativeName)[0];
  console.log(name);
  return (
    <Wrapper>
      <button onClick={() => navigate("/")}>Back</button>
      <Content>
        <img src={data.flags.svg} alt={countyId} />
        <div>
          <h3>{countyId}</h3>
          <ul>
            <li>
              <b>
                Native Name:
                {data.name.nativeName.map((hi: any, index: number) => (
                  <span>Object.values(hi)[index]</span>
                ))}
              </b>
            </li>
            <li>
              <b>Population:</b> {data.population}
            </li>
            <li>
              <b>Region:</b> {data.region}
            </li>
            <li>
              <b>Currencies:</b> {data.currencies.name}
            </li>
            <li>
              <b>Top Level Domain:</b> {data.tld[0]}
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
