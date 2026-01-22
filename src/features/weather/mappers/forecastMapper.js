/**
 * @file forecastMapper.js
 * @description Mapper for transforming raw forecast API data into a daily summary domain model.
 */

import { config } from "@/config/env";
import { WEATHER_CONSTANTS } from "../constants";

/**
 * Transforms raw forecast data into a simplified daily summary.
 *
 * **Interaction Flow:**
 * 1. Receives the list of 3-hour interval records.
 * 2. Groups records by day.
 * 3. Calculates min and max temperature for each day.
 * 4. Selects a representative icon (e.g., usually looking for the midday record).
 * 5. Returns an array of 5 daily summaries.
 *
 * @param {object} apiData - Raw API response.
 * @returns {Array<object>|null} Array of daily forecast objects.
 */
export const toForecastDomainModel = (apiData) => {
  if (!apiData || !apiData.list) return null;

  const { UNITS, DATE_FORMAT } = WEATHER_CONSTANTS;
  const dailyGroups = {};

  // 1. Group by Date
  apiData.list.forEach((item) => {
    // dt is unix timestamp. Convert to YYYY-MM-DD key using app locale logic if possible,
    // but for grouping, simple date string is safer.
    // Let's use the date part of dt_txt provided by API "2022-08-30 15:00:00" -> "2022-08-30"
    const dateKey = item.dt_txt.split(" ")[0];

    if (!dailyGroups[dateKey]) {
      dailyGroups[dateKey] = {
        date: new Date(item.dt * 1000),
        temps: [],
        icons: [],
        weatherConditions: [],
      };
    }

    // Store raw values for aggregation
    dailyGroups[dateKey].temps.push(item.main.temp - UNITS.KELVIN_OFFSET);
    dailyGroups[dateKey].icons.push(item.weather[0].icon);
    dailyGroups[dateKey].weatherConditions.push(item.weather[0].description);
  });

  // 2. Aggregate and Format
  // We want the next 5 days. API might return "today" remaining hours + 4 days, or 5 full days.
  // We'll take the first 5 entries from the map.
  const domainList = Object.values(dailyGroups)
    .slice(0, 5)
    .map((group) => {
      const minTemp = Math.min(...group.temps);
      const maxTemp = Math.max(...group.temps);

      // Simple heuristic for icon: take the one in the middle of the available records (midday-ish)
      const midIndex = Math.floor(group.icons.length / 2);
      const representativeIcon = group.icons[midIndex];
      const representativeCondition = group.weatherConditions[midIndex];

      return {
        id: group.date.toISOString(), // Unique key for lists
        dayName: group.date.toLocaleDateString(config.app.language, {
          weekday: "long",
        }),
        dateShort: group.date.toLocaleDateString(config.app.language, {
          day: "numeric",
          month: "short",
        }),
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        iconCode: representativeIcon,
        condition: representativeCondition,
      };
    });

  return domainList;
};
