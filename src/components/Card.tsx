import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICountry } from "../data/api";
import { convertNumUnits } from "../number";

const ItemWrapper = styled.li`
  background-color: ${(props) => props.theme.elementsColor};
  width: 100%;
  height: auto;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};

  cursor: pointer;
  -webkit-box-shadow: ${(props) => props.theme.shadowColor};
  box-shadow: ${(props) => props.theme.shadowColor};

  /* flags */
  img {
    width: 100%;
    height: 9vw;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }

  /* content */
  div {
    width: 100%;
    padding: 30px;
    height: auto;

    h5 {
      font-weight: 800;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    p {
      line-height: 1.5rem;
    }
    strong {
      font-weight: 600;
    }
  }

  /* laptop */
  @media (max-width: 1280px) {
    /* flags */
    img {
      width: 100%;
      height: 45%;
    }
  }
`;

// Interface
interface IProps {
  data: ICountry;
}

function Card({ data }: IProps) {
  const navigate = useNavigate();
  const onClick = () =>
    navigate(`/country/${data.name.common}`, {
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
          <strong>Population :</strong> {convertNumUnits(data.population)}{" "}
          <br />
          <strong>Region :</strong> {data.region} <br />
          <strong>Capital :</strong>{" "}
          {data.capital && data.capital[0].length > 11
            ? data.capital[0].slice(0, 10) + "..."
            : data.capital}
        </p>
      </div>
    </ItemWrapper>
  );
}

export default React.memo(Card);
