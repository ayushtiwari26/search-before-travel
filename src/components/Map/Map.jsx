import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
//Paper is a div with a background color and useMediaQuery is used to make map responsive for mobile users!!!
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
//we are importing it from the labs because it is stilling being worked on not the core part
import useStyles from "./styles";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  // const coordinates = { lat: 0, lng: 0 };
  // now we make this dynamic so we get the lat and lon from the googlemapreact
  //ismobile variable will become false if the widht of the device is more than 600px;
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        //is key we will specify the google maps key that we will make whenwe create a new project on google developer console.
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        //top,right,bottom,left
        options={""}
        onChange={(e) => {
          // console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
        //used when we accutaly click on the resturant on the maps
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            // we are using this lat and lng to display the cafes on the map
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://imgs.search.brave.com/uAsKm-S_BdOe3XrgtyD8sWXxtcIipf0xkwiojk2phbQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9n/cm91cC1mcmllbmRz/LWVhdGluZy1yZXN0/YXVyYW50XzIzLTIx/NDgwMDY2NDQuanBn/P3NpemU9NjI2JmV4/dD1qcGc"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img
              height={100}
              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="img"
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
