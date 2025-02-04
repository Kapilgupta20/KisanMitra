import React, { useEffect, useState } from "react";
import { Cloud, Sun, Droplets, Wind, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./card.jsx";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    feelsLike: null,
    condition: "",
    humidity: null,
    windSpeed: null,
    uvIndex: null,
    precipitation: null,
    sunrise: "",
    sunset: "",
    location: "", // Added location field
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; 
        const city = "Kolkata";
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        setWeatherData({
          temperature: data.current.temp_f, // Fahrenheit
          feelsLike: data.current.feelslike_f, // Fahrenheit
          condition: data.current.condition.text,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_mph,
          uvIndex: data.current.uv, // UV Index data
          precipitation: data.current.precip_in, // Precipitation data in inches
          sunrise: data.astro ? data.astro.sunrise : "N/A", // Handle missing sunrise data
          sunset: data.astro ? data.astro.sunset : "N/A",   // Handle missing sunset data
          location: data.location.name, // Store the location name
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Sun className="mr-2 h-8 w-8" /> Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold">{weatherData.temperature}°F</p>
                <p className="text-xl text-muted-foreground">{weatherData.condition}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <Cloud className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Precipitation</p>
              <p className="text-lg">{weatherData.precipitation} in</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <Droplets className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-lg">{weatherData.humidity}%</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <Wind className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Wind</p>
              <p className="text-lg">{weatherData.windSpeed} mph</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <Thermometer className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Feels Like</p>
              <p className="text-lg">{weatherData.feelsLike}°F</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
