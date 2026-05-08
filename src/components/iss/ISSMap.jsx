import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../../context/ThemeContext';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.panTo([position.latitude, position.longitude]);
    }
  }, [position, map]);
  return null;
};

export const ISSMap = ({ current, history }) => {
  const { isDarkMode } = useTheme();
  
  const tileUrl = isDarkMode 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const polylinePositions = history.map(p => [p.latitude, p.longitude]);

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <MapContainer 
        center={[0, 0]} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        
        {current && (
          <>
            <Polyline positions={polylinePositions} color="#FC3D21" weight={3} opacity={0.6} dashArray="5, 10" />
            <Marker position={[current.latitude, current.longitude]} icon={issIcon}>
              <Popup className="glass-popup">
                <div className="p-2 text-sm font-semibold">
                  ISS Current Location<br/>
                  Lat: {current.latitude.toFixed(4)}<br/>
                  Lon: {current.longitude.toFixed(4)}
                </div>
              </Popup>
            </Marker>
            <RecenterMap position={current} />
          </>
        )}
      </MapContainer>
    </div>
  );
};
