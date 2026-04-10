/**
 * @file forecastMapper.js
 * @description Mapper for transforming raw forecast API data into a daily summary domain model.
 */

import { WEATHER_CONSTANTS } from "../constants";

/**
 * @typedef {Object} ForecastDay
 * @property {string} id - Unique identifier (ISO date).
 * @property {string} dayName - Name of the day (e.g., "Monday").
 * @property {string} dateShort - Short date format (e.g., "15 Oct").
 * @property {number} minTemp - Minimum temperature of the day.
 * @property {number} maxTemp - Maximum temperature of the day.
 * @property {string} iconCode - Representative weather icon code.
 * @property {string} condition - Representative weather condition description.
 */

/**
 * Transforms raw forecast data into a simplified daily summary.
 *
 * **Algorithmic Improvement (Big O):**
 * - Previous: O(n) with multiple passes (grouping then iterating arrays with spread Math.min/max).
 * - Current: O(n) single-pass aggregation. Min/Max are calculated inline (O(1) per item).
 * - Map usage: Preserves chronological order and provides O(1) lookup.
 * - Memory: Avoids stack overflow by removing `Math.min(...array)` spread.
 *
 * @param {object} apiData - Raw API response.
 * @returns {ForecastDay[]|null} Array of daily forecast objects.
 */
export const toForecastDomainModel = (apiData) => {
  if (!apiData || !apiData.list) return null;

  const { UNITS, LIMITS, LOCALE } = WEATHER_CONSTANTS;
  /** @type {Map<string, { date: Date, minTemp: number, maxTemp: number, icons: string[], conditions: string[] }>} */
  const dailyMap = new Map();

  // Single-pass O(n) loop
  for (const item of apiData.list) {
    const dateKey = item.dt_txt.split(" ")[0];
    const tempCelsius = item.main.temp - UNITS.KELVIN_OFFSET;

    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, {
        date: new Date(item.dt * UNITS.SECONDS_TO_MS),
        minTemp: tempCelsius,
        maxTemp: tempCelsius,
        icons: [item.weather[0].icon],
        conditions: [item.weather[0].description],
      });
    } else {
      const dayData = dailyMap.get(dateKey);

      // Inline min/max calculation to avoid multiple passes and spread overhead
      if (tempCelsius < dayData.minTemp) dayData.minTemp = tempCelsius;
      if (tempCelsius > dayData.maxTemp) dayData.maxTemp = tempCelsius;

      dayData.icons.push(item.weather[0].icon);
      dayData.conditions.push(item.weather[0].description);
    }
  }

  const domainList = [];
  let dayCount = 0;

  // Map.values() preserves insertion order (chronological from API)
  for (const day of dailyMap.values()) {
    if (dayCount >= LIMITS.MAX_FORECAST_DAYS) break;

    const midIndex = Math.floor(day.icons.length / 2);

    domainList.push({
      id: day.date.toISOString(),
      dayName: day.date.toLocaleDateString(LOCALE.DEFAULT, {
        weekday: "long",
      }),
      dateShort: day.date.toLocaleDateString(LOCALE.DEFAULT, {
        day: "numeric",
        month: "short",
      }),
      minTemp: Math.round(day.minTemp),
      maxTemp: Math.round(day.maxTemp),
      iconCode: day.icons[midIndex],
      condition: day.conditions[midIndex],
    });

    dayCount++;
  }

  return domainList;
};
