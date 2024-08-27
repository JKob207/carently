import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { GeoPoint } from 'firebase/firestore';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

const Map = ({ markerPoint }: MapProps) => {

    const centerPoint: LatLngExpression = [markerPoint.latitude, markerPoint.longitude];

    return (
        <MapContainer center={centerPoint} zoom={16}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={centerPoint}/>
        </MapContainer>
    );
};

type MapProps = {
    markerPoint: GeoPoint;
};

export default Map;