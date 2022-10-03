import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICounty } from "../api";

const ItemWrapper = styled.li`
  background-color: ${(props) => props.theme.elementsColor};
  width: 22%;
  min-width: 250px;
  height: 23rem;
  margin-bottom: 4rem;
  border-radius: 5px;
  overflow: hidden;
  color: ${(props) => props.theme.textColor};

  cursor: pointer;
  -webkit-box-shadow: 5px 3px 15px 3px ${(props) => props.theme.shadowColor};
  box-shadow: 5px 3px 15px 3px ${(props) => props.theme.shadowColor};

  img {
    width: 100%;
    height: 11rem;
  }
  div {
    margin-top: 30px;
    margin-left: 25px;
    p {
      line-height: 1.5rem;
    }
    h5 {
      font-weight: 800;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    strong {
      font-weight: 600;
    }
  }
`;

function Card({ data }: ICounty | any) {
  const navigate = useNavigate();
  const onClick = () =>
    navigate(`/county/${data.name.common}`, {
      state: {
        id: data.name.common,
        data,
      },
    });
  return (
    <ItemWrapper onClick={onClick}>
      <img alt={data.name.common} src={data.flags.png} />
      <div>
        <h5>{data.name.common}</h5>
        <p>
          <strong>Population:</strong> {data.population} <br />
          <strong>Region:</strong> {data.region} <br />
          <strong>Capital:</strong> {data.capital}
        </p>
      </div>
    </ItemWrapper>
  );
}

export default Card;
