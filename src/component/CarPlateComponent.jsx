import React from 'react';
import styled from 'styled-components';
import carPlateImg from '../assets/car_plate.png';

const CarPlateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 75px;
  background-image: url(${carPlateImg});
  background-repeat: no-repeat;
  background-position: center center;
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

const PlateNumber = styled.span`
  margin-bottom: 15px;
  margin-left: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #000;
  text-shadow: 2px 2px 0 #fff, 2px 2px 2px rgba(0,0,0,0.5);
`;


export const CarPlateComponent = ({ plateNumber }) => {
    return (
        <CarPlateWrapper>
            <PlateNumber>{plateNumber}</PlateNumber>
        </CarPlateWrapper>
    );
};
