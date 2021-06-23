import React, { Component } from "react";
import { StatusBar, Modal } from "react-native";
import { RNCamera } from 'react-native-camera'
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
  Marker,
  ModalContainer,
  ModalImagesListContainer,
  ModalImagesList,
  ModalImageItem,
  ModalButtons,
  CameraButtonContainer,
  CancelButtonText,
  ContinueButtonText,
  TakePictureButtonContainer,
  TakePictureButtonLabel,
} from './styles';

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
    this.getLocation()
  }

  getLocation = async () => {
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

  // Modal
  renderCameraModal = () => (
    <Modal
      visible={this.state.cameraModalOpened}
      transparent={false}
      animationType="slide"
      onRequestClose={this.handleCameraModalClose}
    >
      <ModalContainer>
        <ModalContainer>
          <RNCamera
            ref={camera => {
              this.camera = camera;
            }}
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidRecordAudioPermissionOptions={{
              title: 'Permissão para usar Camera!',
              message: 'Essa permissão dá o direito ao usuario de gravar videos e capturar imagens',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
          />
          <TakePictureButtonContainer onPress={this.handleTakePicture}>
            <TakePictureButtonLabel />
          </TakePictureButtonContainer>
        </ModalContainer>
        {this.renderImagesList()}
        <ModalButtons>
          <CameraButtonContainer onPress={this.handleCameraModalClose}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CameraButtonContainer>
          <CameraButtonContainer onPress={this.handleDataModalClose}>
            <ContinueButtonText>Continuar</ContinueButtonText>
          </CameraButtonContainer>
        </ModalButtons>
      </ModalContainer>
    </Modal>
  )
  // METODOS
  handleTakePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
      const data = await this.camera.takePictureAsync(options)
      const { realtyData } = this.state;
      this.setState({
        realtyData: {
          ...realtyData,
          images: [
            ...realtyData.images,
            data,
          ]
        }
      })
    }
  }

  renderImagesList = () => (
    this.state.realtyData.images.length !== 0 ? (
      <ModalImagesListContainer>
        <ModalImagesList horizontal>
          {this.state.realtyData.images.map((image, id) => (
            <ModalImageItem key={id} source={{ uri: image.uri }} resizeMode="stretch" />
          ))}
        </ModalImagesList>
      </ModalImagesListContainer>
    ) : null
  )

  handleCameraModalClose = () => this.setState({ cameraModalOpened: !this.state.cameraModalOpened })

  handleDataModalClose = () => this.setState({
    dataModalOpened: !this.state.dataModalOpened,
    cameraModalOpened: false,
  })
  // TELA DE INFORMAÇÕES E CADASTRO API
  renderDataModal = () => (
    <Modal
      visible={this.state.dataModalOpened}
      transparent={false}
      animationType="slide"
      onRequestClose={this.handleDataModalClose}
    >
      <ModalContainer>
        <ModalContainer>
          <MapboxGL.MapView
            centerCoordinate={[
              this.state.realtyData.location.longitude,
              this.state.realtyData.location.latitude
            ]}
            style={{ flex: 1 }}
            styleURL={MapboxGL.StyleURL.Dark}
          >
            <MapboxGL.PointAnnotation
              id="center"
              coordinate={[
                this.state.realtyData.location.longitude,
                this.state.realtyData.location.latitude
              ]}
            >
              <MarkerContainer>
                <MarkerLabel />
              </MarkerContainer>
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </ModalContainer>
        {this.renderImagesList()}
        <Form>
          <Input
            placeholder="Nome do Imóvel"
            value={this.state.realtyData.name}
            onChangeText={name => this.handleInputChange('name', name)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Endereço"
            value={this.state.realtyData.address}
            onChangeText={address => this.handleInputChange('address', address)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Preço"
            value={this.state.realtyData.price}
            onChangeText={price => this.handleInputChange('price', price)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Form>
        <DataButtonsWrapper>
          <SelectButtonContainer onPress={this.saveRealty}>
            <ButtonText>Salvar Imóvel</ButtonText>
          </SelectButtonContainer>
          <CancelButtonContainer onPress={this.handleDataModalClose}>
            <ButtonText>Cancelar</ButtonText>
          </CancelButtonContainer>
        </DataButtonsWrapper>
      </ModalContainer>
    </Modal>
  )

  // METODOS TELA INFORMAÇOES
  handleInputChange = (index, value) => {
    const { realtyData } = this.state;
    switch (index) {
      case 'name':
        this.setState({
          realtyData: {
            ...realtyData,
            name: value,
          }
        });
        break;
      case 'address':
        this.setState({
          realtyData: {
            ...realtyData,
            address: value,
          }
        });
        break;
      case 'price':
        this.setState({
          realtyData: {
            ...realtyData,
            price: value,
          }
        });
        break;
    }
  }

  saveRealty = async () => {
    try {
      const {
        realtyData: {
          name,
          address,
          price,
          location: {
            latitude,
            longitude
          },
          images
        }
      } = this.state;

      const newRealtyResponse = await api.post('/properties', {
        title: name,
        address,
        price,
        latitude: Number(latitude.toFixed(6)),
        longitude: Number(longitude.toFixed(6)),
      });

      const imagesData = new FormData();

      images.forEach((image, index) => {
        imagesData.append('image', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `${newRealtyResponse.data.title}_${index}.jpg`
        });
      });

      await api.post(
        `/properties/${newRealtyResponse.data.id}/images`,
        imagesData,
      );

      this.getLocation()
      this.setState({ newRealty: false });
      this.handleDataModalClose()
    } catch (err) {
      console.tron.log(err);
    }
  }

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
        {this.renderCameraModal()}
      </Container>

    );

  }
}
export default Main