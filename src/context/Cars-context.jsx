/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";

import { getAuth } from "firebase/auth";

const favCars = [];

const CarsContext = createContext({
    cars: favCars,
    addCar: (favCar) => {},
    removeCar: (id) => {},
    isFavouriteCar: (id) => {},
    carData: "",
    addData: (newData) => {},
});

export const CarsContextProvider = (props) => {
    const [favouriteCars, setFavouriteCars] = useState([]);
    const [carData, setCarData] = useState(``);

    const addData = (newData) => {
        setCarData(newData);
    };

    const addCar = (favCar) => {
        setFavouriteCars((prevState) => prevState.concat(favCar));
    };

    const removeCar = (carId) => {
        setFavouriteCars((prevState) => {
            return prevState.filter((favCar) => favCar.id !== carId);
        });
    };

    const isFavouriteCar = (carId) => {
        return favouriteCars.some((favCar) => favCar.id === carId);
    };

    const data = {
        cars: favouriteCars,
        addCar,
        removeCar,
        isFavouriteCar,
        carData,
        addData,
    };

    return (
        <CarsContext.Provider value={data}>
            {props.children}
        </CarsContext.Provider>
    );
};

export default CarsContext;
