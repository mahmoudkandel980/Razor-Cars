import React, { useContext, useState, useEffect } from "react";

import { getAuth } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";

import CarsContext from "../context/Cars-context";

import audi from "../assets/carsLogo/audi-logo.png";
import bently from "../assets/carsLogo/bentley-logo.png";
import bmw from "../assets/carsLogo/bmw-logo.png";
import dodge from "../assets/carsLogo/dodge-logo.png";
import ferrari from "../assets/carsLogo/ferrari-logo.png";
import ford from "../assets/carsLogo/ford-logo.png";
import lamborghini from "../assets/carsLogo/lamborghini-logo.png";
import porsche from "../assets/carsLogo/porsche-logo.png";
import tesla from "../assets/carsLogo/tesla-logo.png";
import toyota from "../assets/carsLogo/toyota-logo.png";
import mercedes from "../assets/carsLogo/mercedes-benz-logo.png";

function Home() {
    const [, setFavouriteCars] = useState([]);
    const [, setLoading] = useState(true);
    const FavCarsctx = useContext(CarsContext);
    const user = getAuth().currentUser;

    const { cars } = FavCarsctx;
    useEffect(() => {
        const fetchCars = async () => {
            try {
                //get reference
                const carsRef = collection(db, `${user.uid}`);
                const q = query(
                    carsRef,
                    orderBy("timestamp", "desc")
                    // limit(10)
                );

                //excute query
                const querySnap = await getDocs(q);

                let favouriteCars = [];

                querySnap.forEach((doc) => {
                    return favouriteCars.push({
                        ...doc.data(),
                    });
                });

                setFavouriteCars(favouriteCars);

                if (cars.length === 0) {
                    cars.push(...favouriteCars);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) {
            fetchCars();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, cars]);

    return (
        <div className="cars-logo">
            <img src={audi} alt="audi-logo" />
            <img src={bently} alt="bently-logo" />
            <img src={bmw} alt="bmw-logo" />
            <img src={dodge} alt="dodge-logo" />
            <img src={ferrari} alt="ferrari-logo" />
            <img src={ford} alt="ford-logo" />
            <img src={mercedes} alt="mercedes-logo" />
            <img src={lamborghini} alt="lamborghini-logo" />
            <img src={porsche} alt="porsche-logo" />
            <img src={tesla} alt="tesla-logo" />
            <img src={toyota} alt="toyota-logo" />
        </div>
    );
}

export default Home;
