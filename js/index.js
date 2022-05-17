import currentWeather from "./current-Weather.js";
import weeklyWeather from './weekly-weather.js'
import {viewportSize} from "../utils/viewport.js";
import './tab.js';

const $app = document.querySelector('#app');
const $loading = document.querySelector('#loading');


viewportSize($app);
viewportSize($loading);
currentWeather();
weeklyWeather();

