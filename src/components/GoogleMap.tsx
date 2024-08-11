import { GeoPoint } from 'firebase/firestore';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ pickupMap }: GoogleMapProps) => {
    const defaultProps = {
        center: {
          lat: pickupMap.latitude,
          lng: pickupMap.longitude
        },
        zoom: 15
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderMarkers = (map: any, maps: any) => {
        const marker = new maps.Marker({
            position: { lat: pickupMap.latitude, lng: pickupMap.longitude },
            map,
            title: 'Hello World!'
        });
        return marker;
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{key: import.meta.env.VITE_GOOGLE_API_KEY}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
            >
            </GoogleMapReact>
        </div>
    );
};

type GoogleMapProps = {
    pickupMap: GeoPoint
};

export default GoogleMap;