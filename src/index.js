import "./styles.css";

async function getWeatherData(location) {
  const query = location;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=RPQEBHWSNE2LNVFN6W8EK4HMT`,
      { mode: "cors" },
    );
    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    alert("Invalid entry.");
    return null;
  }
}

function processWeatherData(data) {
  return {
    location: data.address,
    temperature: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    conditions: data.currentConditions.conditions,
  };
}

const locationInput = document.getElementById("location-input");
const locationSearch = document.getElementById("location-search");

locationSearch.addEventListener("click", async () => {
  const weatherData = await getWeatherData(locationInput.value);
  if (weatherData) {
    renderWeatherCard(weatherData);
  }
});

function renderWeatherCard(wdata) {
  const content = document.getElementById("content");

  if (content) {
    content.innerHTML = `
            <div class="weather-card">
            <h1>${wdata.location.toUpperCase()}</h1>
            <p>Temperature: ${wdata.temperature}°C</p>
            <p>Feels Like: ${wdata.feelsLike}°C</p>
            <p>Conditions: ${wdata.conditions}</p>
            </div>
        `;
  }
}
