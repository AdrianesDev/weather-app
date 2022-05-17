import { getWeeklyWeather } from "./services/weather.js";
import { getLanLon } from "./geolocation.js";
import { formatWeeklyList } from "../utils/format-data.js";
import { createDom } from "../utils/dom.js";
import { createPeriodTime } from "./period-time.js";
import draggble from "./draggble.js";

function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">
          
      </ul>
    </div>
  </div>
  `;
}

function createTabPanel(id) {
  const $panel = createDom(tabPanelTemplate(id));
  if (id > 0) {
    $panel.hidden = true;
  }
  return $panel;
}

function configWeeklyWeather(weekList) {
  // // const $container = document.querySelector('.weeklyWeather')
  const $container = document.querySelector(".tabs");
  weekList.forEach((day, index) => {
    const $panel = createTabPanel(index);
    $container.append($panel);

    day.forEach((weather) => {
      $panel
        .querySelector(".dayWeather-list")
        .append(createPeriodTime(weather));
    });
  });
  
}

export default async function weeklyWeather() {
  const $container = document.querySelector('.weeklyWeather')

  const { lat, lon, isError } = await getLanLon();
  if (isError) return console.log("Ah ocurrido un error ubicandote");
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  );
  if (weeklyWeatherError)
    return console.log("Ah ocurrido un error con el pronostico");
  const weekList = formatWeeklyList(weather.list);
  configWeeklyWeather(weekList);
  draggble($container);
}
