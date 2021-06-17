import React, { Component } from "react";
import { } from "react-native";
import api from '../../services/api'
import MapboxGL from "@react-native-mapbox-gl/maps";

import {
  Container,
  AnnotationContainer,
  AnnotationText
} from './styles'

MapboxGL.setAccessToken('pk.eyJ1IjoiY2F2YWxlaXJvLXBhbGlkbyIsImEiOiJja3EwN2liMXgwMjc2MnBrMTIxYmx2bHVvIn0.9WE7jRWiEkPPpyq7pO0fSw');

MapboxGL.setConnected(true);

class Main extends Component {

  state = {
    locations: [],
  }

  async componentDidMount() {
    try {
      const response = await api.get('/properties', {
        params: {
          latitude: -23.386775712851428,
          longitude: -51.12725626489655
        },
      });

      this.setState({ locations: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  renderLocations = () => (
    this.state.locations.map((location, key) => (
      <MapboxGL.PointAnnotation
        key={key}
        id={location.id.toString()}
        coordinate={[parseFloat(location.longitude), parseFloat(location.latitude)]}
      >
        <AnnotationContainer>
          <AnnotationText>{location.price}</AnnotationText>
        </AnnotationContainer>
        <MapboxGL.Callout title={location.title} />
      </MapboxGL.PointAnnotation>
      
    ))
  )


  render() {

    return (

      <Container>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Dark}
          zoomLevel={17}
          centerCoordinate={[-51.12732063792373, -23.385224734832722]}
          logoEnabled={false}

        >
          {this.renderLocations()}
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[-51.12732063792373, -23.385224734832722]}
            animationMode={'easeTo'}
            animationDuration={0}
          />

        </MapboxGL.MapView>

      </Container>

    );

  }
}
export default Main