# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] - 2024-08-01

### Added
- **Comprehensive Project Documentation**:
    - Created `DOCUMENTACION_SOFTWARE.md` as the central source of truth for architecture, design patterns, and component references.
    - Added `GLOSARIO.md` with definitions for all key project terms and technologies.
    - Added `TUTORIAL_PRACTICO.md` with guided exercises for onboarding new developers.
- **`react-icons` Library**: Added the `react-icons` library to the project to manage all icons in a standardized way.
- **`WeatherIcon` Component**: Created a new component at `src/features/weather/components/WeatherIcon.jsx` to map OpenWeatherMap API icon codes to specific, high-quality icons from the 'Weather Icons' (`wi`) collection.

### Changed
- **Icon Implementation Refactoring**:
    - Replaced the hardcoded SVG loading spinner in `Search.jsx` with the `FaSpinner` icon from `react-icons`.
    - Replaced the external image-based weather icons (`<img>` tag) in `WeatherCard.jsx` with the new `WeatherIcon` component.
- **Data Mapper Update**: `weatherMapper.js` was updated to provide the raw `iconCode` from the API instead of a full image URL, decoupling the data model from a specific visual representation.
- **Documentation Structure**: Consolidated all previous `.md` files from `src/docs` into a new, structured documentation suite and removed the redundant files.
- **`README.md` Update**: The main `README.md` was simplified and updated to link to the new comprehensive documentation in the `src/docs` directory.
