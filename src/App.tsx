
import './App.css'
import { Form, InputGroup, Button, Container, Row, Col, } from 'react-bootstrap'
import React, { useState } from 'react'

function App() {

  const API_KEY = "3f4134959c25453fa05155029232408";

  // Dynamic Variables
  const [location, setLocation] = useState<string>("")
  const [data, setData] = useState({
    "location": {
      "name": "Multan",
      "region": "Punjab",
      "country": "Pakistan",
      "lat": 30.2,
      "lon": 71.48,
      "tz_id": "Asia/Karachi",
      "localtime_epoch": 1692892324,
      "localtime": "2023-08-24 20:52"
    },
    "current": {
      "last_updated_epoch": 1692891900,
      "last_updated": "2023-08-24 20:45",
      "temp_c": 32.0,
      "temp_f": 89.6,
      "is_day": 0,
      "condition": {
        "text": "Overcast",
        "icon": "//cdn.weatherapi.com/weather/64x64/night/122.png",
        "code": 1009
      },
    }
  })

  // Handling Input Field Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
    console.log(location)
  }

  // Fetching Data from Weather API
  const handleClick = async () => {
    if (!location && location.length < 4)
      return;
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`);
    const data = await response.json();
    if (data)
      setData(data)
  }

  // Rendering APP
  return (
    <div>
      <nav className='container'>
        <h1 className='logo'>Weather App</h1>
      </nav>

      <main className='container'>
        {/* Weather Location Input Form */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter Location"
            onChange={handleChange}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={handleClick}>
            Fetch Weather
          </Button>
        </InputGroup>
        <section>
          <h2 className="my-4">Weather</h2>
          <hr />
         {data && <Container>
            <Row>
              <Col md={'auto'}>
                <img src={`${data.current.condition.icon}`} alt="icon" width={150} height={150} />
                <span >{data.current.condition.text}</span>
                <span className={"p-4"} >{data.current.temp_c}*C | {data.current.temp_f}*F</span>
              </Col>
              <Col   >
              </Col>
            </Row>
              <Row>

                <Col><span className='T-head'  >Name</span></Col>
                <Col><span className='T-head' >Country</span></Col>
                <Col><span className='T-head' >Region</span></Col>
              </Row>
              <Row>

                <Col><span>{data.location.name}</span></Col>
                <Col><span>{data.location.country}</span></Col>
                <Col><span>{data.location.region}</span></Col>
              </Row>
          </Container>
          }

        </section>
      </main>
      <footer>
        <p className='footer'>Copyright Reserved @weatherApp2023</p>
      </footer>
    </div>
  )
}

export default App
