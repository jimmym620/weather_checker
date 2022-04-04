import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [city, setCity] = useState("London");
    const [currentData, setCurrentData] = useState("");
    useEffect(() => {
        getCurrentData();
    }, []);

    const getCurrentData = () => {
        axios
            .get(
                `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
            )
            .then((response) => {
                setCurrentData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCityInput = (event) => {
        setCity(event.target.value);
    };


    return (
        <div className="App">
            <div className="form">
                <input
                    type="text"
                    name="city"
                    placeholder="London"
                    value={city}
                    onChange={handleCityInput}
                />
                <button onClick={getCurrentData}>Submit</button>
            </div>
            {currentData ? (
                <article>
                    <h1>{currentData.location.name}</h1>
                    <p>{`Temp: ${currentData.current.temp_c}°C`}</p>
                    <p>{`Feels like: ${currentData.current.feelslike_c}°C`}</p>
                    <p>{currentData.current.condition.text}</p>
                    <p>{`Humidity: ${currentData.current.humidity}%`}</p>
                </article>
            ) : (
                "Loading"
            )}
        </div>
    );
}

export default App;
