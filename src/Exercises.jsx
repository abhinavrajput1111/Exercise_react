import React, { useState, useEffect } from "react";

function Exercises() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  function getData() {
    const url = "https://exercisedb.p.rapidapi.com/exercises?limit=50";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c463afc5d4msh6881945cdf0662ap1d1b98jsn20354251ff10",
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
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (input) {
      const filtered = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.bodyPart.toLowerCase().includes(input.toLowerCase()) ||
          item.equipment.toLowerCase().includes(input.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }

  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-5 p-5 text-amber-500 tracking-wider">
        Exercises You Should Know
      </h1>

      <div className="my-10 w-full">
        <form
          method="post"
          action=""
          className="w-full flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Exercise Name"
            className="w-[20%] border-2 py-1 rounded-lg px-7"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="px-5 text-white font-semibold py-1 bg-green-500 hover:bg-green-700 rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-5 w-full">
        {filteredData.map((item, index) => (
          <div key={index} className="m-5 p-8 bg-amber-50 w-[28%]">
            <div className="text-2xl my-2 px-5 text-center uppercase font-bold">
              {item.name}
            </div>
            <div className="text-xl text-center my-2">{item.bodyPart}</div>

            <div>
              <img src={item.gifUrl} className="my-5" alt={item.name} />
            </div>

            <div>
              {item.secondaryMuscles &&
                item.secondaryMuscles.length > 0 &&
                item.secondaryMuscles.map((sec, index) => (
                  <div
                    key={index}
                    className="flex w-full justify-center items-center m-3"
                  >
                    <span className="mx-5 px-3 flex py-2 rounded-lg bg-amber-500 text-white text-lg">
                      {sec}
                    </span>
                  </div>
                ))}
            </div>
            <div>
              {item.instructions &&
                item.instructions.length > 0 &&
                item.instructions.map((desc, index) => (
                  <p key={index} className="my-2 text-lg p-3">
                    - {desc}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercises;
