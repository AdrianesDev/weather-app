import { createDom } from "../utils/dom.js"
import { formatDate, formatTemp } from "../utils/format-data.js"

export function periodTimeTemplate({temp,date,icon,description}){
  return `
  <li class="dayWeather-item is is-selected">
    <span class="dayWeather-time">${date}</span>
    <img class="dayWeather-icon" height = "48" width = "48" src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" rain="">
    <span class="dayWeather-temp">${temp}</span>
  </li>
  `
}

export function createPeriodTime(weather){
  const dateOption ={
    hour:'numeric',
    hour12:true
  }
  const temp = formatTemp(weather.main.temp);
  const date = formatDate(new Date(weather.dt * 1000),dateOption)
  const config ={
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description
  }
  return createDom(periodTimeTemplate(config))
}