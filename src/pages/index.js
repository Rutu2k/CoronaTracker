import React from 'react';
import { Helmet } from 'react-helmet';

import axios from 'axios';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';


const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
*/
//const MapEffect = ({leafletElement: map}) => {
//};
async function MapEffect({ leafletElement: map } = {}) {
  let response;
  try{
    response = await axios.get('https://corona.lmao.ninja/v3/covid-19/countries');
  }
  catch(e){
    console.log(`Failed to fetch countries: ${e.message}`,e);
    return;
  }
  const { data = [] } = response;

  
  const hasData = Array.isArray(data) && data.length > 0;
  if(!hasData) return;

  const geoJson = {
    type: 'FeatureCollection',
    features: data.map((country = {}) => {
      const{countryInfo = {} } = country;
      const{lat,long: lng} = countryInfo;
      return{
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates:[lng,lat]
        }
      }
    })
  } 
}

const IndexPage = () => {

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    MapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
      </Map>

      <Container type="content" className="text-center home-start">
      </Container>
    </Layout>
  );
};

export default IndexPage;
