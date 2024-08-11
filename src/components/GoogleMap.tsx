import GoogleMapReact from 'google-map-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyReactComponent = (props: any) => <div>{props.text}</div>;

const GoogleMap = () => {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <GoogleMapReact
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom} 
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text='My Marker' />
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMap;