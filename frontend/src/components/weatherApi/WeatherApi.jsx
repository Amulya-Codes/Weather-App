import "./WeatherApi.css";
import { useState, useEffect } from "react";
import { useFetch } from "../../modules/useFetch.js";
import { Col, Container, Image, Row } from "react-bootstrap";

function WeatherApi() {
  const apiKey = import.meta.env.VITE_API_WEATHER;
  
  // set default
  const [city, setCity] = useState("Roma");
  const [country, setCountry] = useState("IT");

  const [URL_API, setURL_API] = useState(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`);
  const { data, loading, error } = useFetch(URL_API);

  const icon = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@4x.png`
    : null;

  useEffect(() => {
    const fetchData = () => {
      setURL_API(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    };

    fetchData(); // Call fetchData initially to load data
    const intervalId = setInterval(fetchData, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [city, country, apiKey]); // Add dependencies

  return (
    <Container className="mt-4">
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <div className="content__weather">
        <Row className="d-flex justify-content-center">
          <Col>
            <Image src={icon} alt="weather icon" />
          </Col>
          <Col>
            <p>
              City: <span className="fw-bold">{data.name}</span>
            </p>
            <p>
              <i className="bi bi-thermometer-half"></i> Temp.{" "}
              <span className="fw-bold">{data.main?.temp} °C</span> -{" "}
              <i className="bi bi-thermometer-low"></i> Temp. Min{" "}
              <span className="fw-bold">{data.main?.temp_min} °C</span> -{" "}
              <i className="bi bi-thermometer-high"></i> Temp. Max{" "}
              <span className="fw-bold">{data.main?.temp_max} °C</span>
            </p>
            <p>
              Pressure:{" "}
              <span className="fw-bold">{data.main?.pressure} mmHg</span>
            </p>
            <p>
              <i className="bi bi-droplet"></i> Humidity:{" "}
              <span className="fw-bold">{data.main?.humidity} %</span>
            </p>
            <p>
              <i className="bi bi-wind"></i> Wind:{" "}
              <span>{data.wind?.speed} meter/sec</span> - Deg:{" "}
              <span>{data.wind?.deg} degrees</span> - Gust:{" "}
              <span>{data.wind?.gust} meter/sec</span>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default WeatherApi;
