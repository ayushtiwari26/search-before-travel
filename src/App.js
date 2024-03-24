import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData } from "./api";
// Question: How we call an funtion in the funtional app component Ans: useEffect is used to create an use effect
const App = () => {
  const [places, setPlaces] = useState([]);
  // staring is with empty array []
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  // staring is with empty object {}
  const [bounds, setBounds] = useState({});
  // starting is with null

  const [type, setType] = useState("resturants");
  const [rating, setRating] = useState("");
  // we are using these state here because get diffrent data from getplaces api

  // Now i want to get the user location when the app is string for that i will use useEffect

  // Now include loading in the map
  const [isLoading, setIsLoading] = useState(false);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // navigator.geolocation is the browser inbulit property which we are using here to get the location of the user when the app starts only.
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      // console.log(coordinates, bounds);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }

    // getPlaceData is an asyn funtion so we have to use .then in here.
  }, [type, bounds]);
  // if the dependence array is empty then the that means that the useEffect will run only when the app is started.

  // for using option of the rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />

      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* Sinse we are doing inline css it has to be an object so we have double curcly braces */}
        <Grid item xs={12} md={4}>
          {/* xs is for mobile and take full length in the mobile */}
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            // for more level deep we should use usecontext
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default App;
