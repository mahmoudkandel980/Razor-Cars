import React, { useContext, useState, useEffect } from "react";

import CarsContext from "../context/Cars-context";
import Card from "../components/UI/Card";
import Spinner from "../components/UI/Spinner";
import ToggleCarsPage from "../components/UI/ToggleCarsPage";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

// import { carsData } from "../components/data/CarsMotobikes";

function Cars() {
    const FavCarsctx = useContext(CarsContext);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                //get reference
                const carsRef = collection(db, "cars");
                const q = query(
                    carsRef,
                    orderBy("timestamp", "desc")
                    // limit(10)
                );

                //excute query
                const querySnap = await getDocs(q);

                let cars = [];

                querySnap.forEach((doc) => {
                    return cars.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setLoading(false);
                setCars(cars);
            } catch (error) {
                toast.error("couldn`t fetch listings");
            }
        };
        fetchCars();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="cars">
                <ToggleCarsPage />
                <div className="container mb-large">
                    <h1 className="heading heading-secondary">Razor`s Cars</h1>
                </div>
                <div className="container">
                    {loading ? (
                        <Spinner />
                    ) : cars && cars.length > 0 ? (
                        cars.map(
                            (car, index) =>
                                car.data.userRef ===
                                    "TPHWrvbU8WUOBQ215OJsUWcDnW32" && (
                                    <Card
                                        key={car.id}
                                        id={car.id.replaceAll(/\s/g, "")}
                                        imgSrcText={car.data.imgSrcText}
                                        imgUrl={car.data.imgUrl}
                                        carName={car.data.carName}
                                        carTopSpeed={car.data.topSpeed}
                                        carAcceleration={
                                            car.data.carAcceleration
                                        }
                                        carBhp={car.data.carBhp}
                                        carPrice={car.data.carPrice}
                                        favCar={FavCarsctx.isFavouriteCar(
                                            car.data.carName.replaceAll(
                                                /\s/g,
                                                ""
                                            )
                                        )}
                                        userName={
                                            car.data.userName
                                                ? car.data.userName
                                                : ""
                                        }
                                        phone={
                                            car.data.phone ? car.data.phone : ""
                                        }
                                        userEmail={
                                            car.data.userEmail
                                                ? car.data.userEmail
                                                : ""
                                        }
                                        userRef={car.data.userRef}
                                        fade={
                                            window.innerWidth >= 1379
                                                ? index % 3 === 1
                                                    ? "fade-up"
                                                    : index % 3 === 2
                                                    ? "fade-up-left"
                                                    : "fade-up-right"
                                                : window.innerWidth >= 821
                                                ? index % 2 === 0
                                                    ? "fade-up-left"
                                                    : "fade-up-right"
                                                : "fade-up"
                                        }
                                    />
                                )
                        )
                    ) : (
                        <p className="text">No cars to show</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cars;
