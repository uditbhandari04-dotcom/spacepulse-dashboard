import axios from 'axios';

const ISS_BASE_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const ASTROS_URL = 'https://api.open-notify.org/astros.json'; // Note: Open-Notify astros might still have issues on HTTPS, but many proxies exist. 
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

export const getISSLocation = async () => {
  const response = await axios.get(ISS_BASE_URL);
  return {
    latitude: parseFloat(response.data.latitude),
    longitude: parseFloat(response.data.longitude),
    timestamp: response.data.timestamp,
    altitude: response.data.altitude,
    velocity: response.data.velocity,
    visibility: response.data.visibility
  };
};

export const getAstronauts = async () => {
  try {
    // Open Notify doesn't support HTTPS well, using a CORS proxy or fallback
    const response = await axios.get('https://corsproxy.io/?' + encodeURIComponent('http://api.open-notify.org/astros.json'));
    return response.data;
  } catch (error) {
    console.error('Astronauts fetch error:', error);
    return { number: 0, people: [] };
  }
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
    return 'Tracking Over International Waters';
  }
};
