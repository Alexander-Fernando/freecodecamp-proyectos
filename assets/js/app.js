/*  DOOM ELEMENTS */
const url = `https://weather-proxy.freecodecamp.rocks`;
const nameLocation = document.querySelector('.card__name');
const icon = document.querySelector('.card__icon');
const temperature = document.querySelector('.card__value');
const feelsTemp = document.querySelector('.feels');
const maxTemp = document.querySelector('.max_temperature');
const minTemp = document.querySelector('.min_temperature');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const pressure = document.querySelector('.pressure');
const country = document.querySelector('.country');
const description = document.querySelector('.card__description');
const image = document.querySelector('.card__img');
const dateElement = document.querySelector('.card__date');
const button = document.querySelector('.card__cta');
let unidad = 'C';

/*  NAVIGATION API */
document.addEventListener('DOMContentLoaded', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      displayData(latitude, longitude);
    });
  } else {
    alert('Geolocation is not available');
  }
});

/*  EVENTS LISTENER */
button.addEventListener('click', (e) => {
  e.preventDefault();
  convertTemp();
});

const convertTemp = () => {
  if (unidad === 'C') {
    unidad = 'F';

    temperature.textContent = `${celsiusToFar(
      parseFloat(temperature.textContent)
    )} °${unidad}`;

    feelsTemp.textContent = `${celsiusToFar(
      parseFloat(feelsTemp.textContent)
    )} °${unidad}`;

    maxTemp.textContent = `${celsiusToFar(
      parseFloat(maxTemp.textContent)
    )} °${unidad}`;

    minTemp.textContent = `${celsiusToFar(
      parseFloat(minTemp.textContent)
    )} °${unidad}`;
  } else {
    unidad = 'C';
    temperature.textContent = `${farenheitToCel(
      parseFloat(temperature.textContent)
    )} °${unidad}`;
    feelsTemp.textContent = `${farenheitToCel(
      parseFloat(feelsTemp.textContent)
    )} °${unidad}`;

    maxTemp.textContent = `${farenheitToCel(
      parseFloat(maxTemp.textContent)
    )} °${unidad}`;

    minTemp.textContent = `${farenheitToCel(
      parseFloat(minTemp.textContent)
    )} °${unidad}`;
  }
};

const celsiusToFar = (temp) => {
  return ((temp * 9) / 5 + 32).toFixed(1).toString();
};

const farenheitToCel = (temp) => {
  return (((temp - 32) * 5) / 9).toFixed(1).toString();
};

const generateDate = () => {
  const date = new Date();

  return {
    dia: date.getDate(),
    mes: date.getMonth(),
    anio: date.getFullYear(),
  };
};

const apiCall = async (lat, lon) => {
  const response = await fetch(`${url}/api/current?lat=${lat}&lon=${lon}`);
  const data = await response.json();
  return data;
};

const displayData = async (lat, lon) => {
  const { main, name, sys, wind, weather } = await apiCall(lat, lon);
  humidity.textContent = `${main.humidity} %`;
  maxTemp.textContent = `${main.temp_max} °${unidad}`;
  minTemp.textContent = `${main.temp_min} °${unidad}`;
  windSpeed.textContent = `${wind.speed} mph`;
  pressure.textContent = `${main.pressure} pa`;
  country.textContent = sys.country;
  temperature.textContent = `${main.temp.toFixed(1)} °${unidad}`;
  feelsTemp.textContent = `${main.feels_like} °${unidad}`;
  nameLocation.textContent = name;
  description.textContent = weather[0].description;
  image.src = weather[0].icon;

  const { dia, mes, anio } = generateDate();
  dateElement.textContent = `${dia} / ${mes + 1} / ${anio}`;
};
