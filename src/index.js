import './style.css';

const searchForm = document.querySelector('.form');

async function getWeatherData(location) {
    // variables //
    const API_KEY = 'UNT3R2ZQS8VD6Y4LCMDPKNCQJ';
    const baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;

    const options = {
        mode: 'cors',
    };

    const response = await fetch(baseURL, options);

    return returnWeatherData(response);
}

async function returnWeatherData(response) {
    if (!response.ok) {
        throw new Error('Error encountered!');
    } else {
        const data = await response.json();
        return data.currentConditions;
    }
}

function displayWeather(weatherObject) {
    const { temp, conditions, cloudcover, humidity } = weatherObject;

    const weatherNode = document.querySelector('.weather');
    const loadingComponent = document.querySelector('.loading-comp');

    const tempNode = document.querySelector('.temp');
    const condNode = document.querySelector('.conditions');
    const humidityNode = document.querySelector('.humidity');
    const cloudCoverNode = document.querySelector('.clouds');

    tempNode.textContent = `Temperature: ${temp}`;
    condNode.textContent = `Weather Condition: ${conditions}`;
    humidityNode.textContent = `Humidity: ${humidity}`;
    cloudCoverNode.textContent = `Cloud Cover: ${cloudcover}`;

    weatherNode.classList.remove('hidden');
    document.body.removeChild(loadingComponent);
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const weatherNode = document.querySelector('.weather');

    const loadingComponent = document.createElement('span');
    loadingComponent.setAttribute('class', 'loading-comp');
    loadingComponent.textContent = '...loading...';
    document.body.insertBefore(loadingComponent, weatherNode);

    const searchInput = document.querySelector('.search');

    const searchInputValue = searchInput.value;

    if (searchInputValue) {
        const data = await getWeatherData(searchInputValue);
        displayWeather(data);
    }
});
