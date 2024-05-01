import './App.css';
import React, {useState} from "react";

function App() {

    const apiKey = "c03de2e0824a421e925182446242901";
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleSearchQuery = (e) => {
        console.log(e.target.value);
        setCity(e.target.value);
    }


    const searchBarStyle = {
        "margin": "auto",
        "margin-top": "50px",
        "padding": "10px",
        "width": "45%",
        "border-radius": "5px",
        "border": "1px solid lightgray",
    }

    const buttonStyle = {
        "margin": "auto",
        "padding": "10px",
        "margin-left": "10px",
        "background-color": "green",
        "border": "none",
        "color": "white",
        "border-radius": "5px"
    }
    const cardStyle = {
        "margin": "30px",
        "width": "fit-content",
        "padding": "10px 70px",
        "margin-left": "10px",
        "background-color": "white",
        "box-shadow": "4px 4px 16px 0 rgba(0,0,0,0.2)",
        "border-radius": "5px"
    }
    const search = async (e) => {
        try {
            setIsLoading(true);
            const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            const weatherInfo = await weatherData.json();
            setWeatherData(weatherInfo);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            alert("Failed to fetch weather data")
        }
    }
    console.log(weatherData)
    //
    //  function debounce(e, delay){
    //     let timer;
    //     return function(){
    //         clearTimeout(timer);
    //         timer = setTimeout(()=>{
    //              search(e);
    //         }, delay);
    //     }
    // }
    //
    // const debounceSearch = debounce(search, 500);

    return (<div className="App">
            <input type="text" style={searchBarStyle} placeholder="Enter city name" onChange={handleSearchQuery}/>
            <button style={buttonStyle} onClick={search}>Search</button>

            {isLoading && <p>Loading data...</p>}

            {weatherData && weatherData.current && (
                <div className="weather-cards" style={{display: "flex", margin: "15px", justifyContent: "center"}}>
                    <div className="weather-card" style={cardStyle}>
                        <h4>Temperature</h4>
                        <p>{weatherData.current.temp_c}°C</p>
                    </div>
                    <div className="weather-card" style={cardStyle}>
                        <h4>Humidity</h4>
                        <p>{weatherData.current.humidity}%</p>
                    </div>
                    <div className="weather-card" style={cardStyle}>
                        <h4>Condition</h4>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card" style={cardStyle}>
                        <h4>Wind Speed</h4>
                        <p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>)}
        </div>);
}

export default App;
