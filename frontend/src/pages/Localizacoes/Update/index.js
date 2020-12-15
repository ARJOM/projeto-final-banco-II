import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import api from '../../../services/api';

export function MapContainer(props) {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const {id} = useParams();
    const history = useHistory();

    function mapClicked(mapProps, map, clickEvent){
        setLat(clickEvent.latLng.lat())
        setLong(clickEvent.latLng.lng())
    }

    useEffect(() => {
        api.get(`location/${id}`)
            .then(res => {
                if (res.data !== null){
                    setLong(res.data['long']);
                    setLat(res.data['lat']);
                } else {
                    history.push(`/location/${id}`)
                }
            })
            .catch(err => console.log(err));
    }, [id, history]);

    function handleSubmit(e){
        e.preventDefault();

        const data = {lat, long};

        api.put(`/location/${id}`, data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        history.push("/");

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type={"submit"} value={"Salvar Localização"}/>
            </form>
            <Map
                google={props.google}
                initialCenter={{
                    lat: -6.888429,
                    lng: -38.5603962
                }}
                zoom={14}
                onClick={mapClicked}
            >
                <Marker
                    position={{lat: lat, lng: long}}
                />
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAMPd-ktgpMBkobpsXuINAkQ7iKXhOs7Eo"
})(MapContainer)
