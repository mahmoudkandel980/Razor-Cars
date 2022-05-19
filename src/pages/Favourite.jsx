import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

import CarsContext from "../context/Cars-context";

import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";

function Favourite() {
    const [, setFavouriteCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const FavCarsctx = useContext(CarsContext);
    const navigate = useNavigate();
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
                toast.error("couldn`t fetch listings");
            }
        };
        if (user) {
            fetchCars();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onClick = () => {
        if (user) {
            navigate("/cars");
        } else {
            navigate("/Signin");
        }
    };

    return (
        <>
            <div className="cars">
                <div className="container mb-large">
                    <h1 className="heading heading-secondary">
                        Favourite Cars
                    </h1>
                </div>
                <div className="container">
                    {loading ? (
                        <Spinner />
                    ) : cars.length === 0 && !user ? (
                        <>
                            <div className="text no-car">
                                {user
                                    ? "No favourite cars selected"
                                    : "Please sign in to looding your favourite list"}
                                <Button
                                    className="favourite-btn"
                                    onClick={onClick}
                                >
                                    {user
                                        ? "Add cars to favourite list"
                                        : "Sign in"}
                                </Button>
                            </div>
                        </>
                    ) : (
                        cars.map((car, index) => (
                            <Card
                                key={car.id}
                                id={car.id.replaceAll(/\s/g, "")}
                                imgUrl={car.imgUrl}
                                carName={car.carName}
                                carTopSpeed={car.topSpeed}
                                carAcceleration={car.carAcceleration}
                                carBhp={car.carBhp}
                                carPrice={car.carPrice}
                                favCar={FavCarsctx.isFavouriteCar(
                                    car.carName.replaceAll(/\s/g, "")
                                )}
                                userName={car.userName ? car.userName : ""}
                                phone={car.phone ? car.phone : ""}
                                userEmail={car.userEmail ? car.userEmail : ""}
                                userRef={car.userRef}
                                fade={
                                    window.innerWidth >= 1379
                                        ? index % 3 === 1
                                            ? "fade-up-left"
                                            : index % 3 === 2
                                            ? "fade-up-right"
                                            : "fade-up"
                                        : window.innerWidth >= 821
                                        ? index % 2 === 0
                                            ? "fade-up-right"
                                            : "fade-up-left"
                                        : "fade-up"
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Favourite;
