import axios from 'axios';

const ISS_NOW_URL = 'http://api.open-notify.org/iss-now.json';
const ASTROS_URL = 'http://api.open-notify.org/astros.json';
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

export const getISSLocation = async () => {
  const response = await axios.get(ISS_NOW_URL);
  return {
    latitude: parseFloat(response.data.iss_position.latitude),
    longitude: parseFloat(response.data.iss_position.longitude),
    timestamp: response.data.timestamp,
  };
};

export const getAstronauts = async () => {
  const response = await axios.get(ASTROS_URL);
  return response.data;
};

export const getNearestPlace = async (lat, lon) => {
  try {
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        format: 'json',
        lat,
        lon,
        zoom: 10,
        addressdetails: 1,
      },
      headers: {
        'User-Agent': 'SpacePulseDashboard/1.0',
      },
    });
    
    if (response.data && response.data.display_name) {
      return response.data.display_name;
    }
    return 'Over Open Ocean / Remote Region';
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return 'Coordinate Tracking Active';
  }
};
