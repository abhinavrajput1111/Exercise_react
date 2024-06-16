import React from "react";
import { useEffect, useState } from "react";

function Hero() {

    const [data, setData] = useState([]);

    function getData() {
      const url =
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "a6f775a0edmsh508446ebc358d84p1b8964jsn28dbde94c6fb",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error);
        });
    }

    useEffect(() => {
      getData();
    }, []);

    console.log(data);



    return (
        <div>
            
        </div>
    )

}

export default Hero;
