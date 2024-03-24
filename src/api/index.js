import axios from "axios";
// used to take call api

// const URL =
//   "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
// now we are making url dynamic so that we can use it for hotels and attractions as well

export const getPlacesData = async (type, sw, ne) => {
  try {
    // try block constains the request from the api if the request is successfull then the try block is runned as usual other wise it will run catch block
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    // inside the response we have data so we destructure the data and then again destructure the data.
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://open-weather28.p.rapidapi.com/pincode/in/712235",
        {
          params: { lon: lng, lat: lat },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "open-weather28.p.rapidapi.com",
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
