import React, { Component } from "react";
import { Platform, PermissionsAndroid, View } from "react-native";
import api from '../../services/api'
import MapboxGL from "@react-native-mapbox-gl/maps";

import {
  Container,
  AnnotationContainer,
  AnnotationText,
  NewButtonContainer,
  ButtonsWrapper,
  CancelButtonContainer,
  SelectButtonContainer,
  ButtonText,
  Marker
} from './styles'

MapboxGL.setAccessToken('pk.eyJ1IjoiY2F2YWxlaXJvLXBhbGlkbyIsImEiOiJja3EwN2liMXgwMjc2MnBrMTIxYmx2bHVvIn0.9WE7jRWiEkPPpyq7pO0fSw');

MapboxGL.setConnected(true);


class Main extends Component {

  state = {
    locations: [],
    newRealty: false,
    cameraModalOpened: false,
    dataModalOpened: false,
    realtyData: {
      location: {
        latitude: 0,
        longitude: 0,
      },
      name: '',
      price: '',
      address: '',
      images: [],
    },
  };

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
  // CONDIÇÃO DE RENDERIZAÇÃO DOS BOTÕES
  renderConditionalsButtons = () => (
    !this.state.newRealty ? (
      <NewButtonContainer onPress={this.handleNewRealtyPress}>
        <ButtonText >Novo Imóvel</ButtonText>
      </NewButtonContainer>
    ) : (
      <ButtonsWrapper>
        <SelectButtonContainer onPress={this.handleGetPositionPress}>
          <ButtonText>
            Selecionar localização
          </ButtonText>
        </SelectButtonContainer>
        <CancelButtonContainer onPress={this.handleNewRealtyPress}>
          <ButtonText>Cancelar</ButtonText>
        </CancelButtonContainer>
      </ButtonsWrapper>
    )
  )

  renderMarker = () => (
    this.state.newRealty &&
    !this.state.cameraModalOpened &&
    <Marker resizeMode="contain" source={require('../../images/marker.png')} />
  )
  // METODOS
  handleNewRealtyPress = () => {
    this.setState({ newRealty: !this.state.newRealty, cameraModalOpened: false })
  }
  handleGetPositionPress = async () => {
    try {
      const [longitude, latitude] = await this.map.getCenter();
      this.setState({
        cameraModalOpened: true,
        realtyData: {
          ...this.state.realtyData,
          location: {
            latitude: latitude,
            longitude: longitude,
          }
        }
      });
    } catch (err) {
      console.log(err);
    }

    console.log(await this.map.getCenter())
  }

  // RENDERIZAR LOCALIZAÇÃO  IMOVEIS
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
          ref={map => {
            this.map = map;
          }}
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
        {this.renderConditionalsButtons()}
        {this.renderMarker()}
      </Container>

    );

  }
}
export default Main