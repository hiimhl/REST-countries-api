import React from "react";
import styled from "styled-components";
import { ICounty } from "../api";

const ItemWrapper = styled.li`
  background-color: aquamarine;
  width: 22%;
  height: 24rem;
  margin-bottom: 4rem;
  border-radius: 5px;
`;

function Card({ data }: ICounty | any) {
  console.log(data);
  return (
    <ItemWrapper>
      <img alt={data.name.common} src={data.flags.png} />
      <h5>{data.name.common}</h5>
      <p>
        <strong>Population:</strong> {data.population} <br />
        <strong>Region:</strong> {data.region} <br />
        <strong>Capital:</strong> {data.capital}
      </p>
    </ItemWrapper>
  );
}

export default Card;
