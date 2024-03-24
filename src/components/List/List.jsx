import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
import PalceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();
  // const [type, setType] = useState("resturants");
  // const [rating, setRating] = useState("");
  // moving the state to app.js from here which means we are moving state 1 level up kyuki bas 1 level up leke jare hai issiye simply move karre hai verna hmko usecontext use karna padegause karna hota

  // console.log({ childClicked });
  // we have the info of eacxh child restorant now how can we scroll to an specific retorent int the list ANS for that we will use useref

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  // static places which i was using before getting proprs from app.js in form of api
  // const places = [
  //   { name: "Cool Place" },
  //   { name: "Best Beer" },
  //   { name: "Best Streak" },
  //   { name: "Cool Place" },
  //   { name: "Best Beer" },
  //   { name: "Best Streak" },
  //   { name: "Cool Place" },
  //   { name: "Best Beer" },
  //   { name: "Best Streak" },
  // ];

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotel & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              {/*e contains all the menuitems e.target.value is going to give values which are selected in the select menu by the user and keep changing as the user changes*/}
              <MenuItem value="resturants"> Resturants</MenuItem>
              <MenuItem value="hotels"> Hotels</MenuItem>
              <MenuItem value="attractions"> Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              {/*e contains all the menuitems e.target.value is going to give values which are selected in the select menu by the user and keep changing as the user changes*/}
              <MenuItem value={0}> All</MenuItem>
              <MenuItem value={3}> Above 3.0</MenuItem>
              <MenuItem value={4}> Above 4.0</MenuItem>
              <MenuItem value={4.5}> Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                {/* xs= means ki extrasmall se le kar md lg tak sare bade screen tak sab me 12 means full length lega sab me */}
                <PalceDetails
                  place={place}
                  selected={Number(childClicked) == i}
                  refProp={elRefs[i]}
                />
                {/* passsing place props in PlaceDetails from here */}
              </Grid>
            ))}
            {/* ? means that if you have places then only map over them and age ka conditon execute karo */}
            {/* Map is a funtion which takes callback funtions in each iteration of a call back funtion, it has a new place so 1st parameter in a map funtion is an iterator and the second is index of the list */}
            {/* Parenthesis {} is used to open call back funtion but if you are returning an piece of jsx we use () square bracket like in this case */}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
