import styled from 'styled-components';

import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const AnnotationContainer = styled.View`
  align-Items: center;
  justify-Content: center;
  background-Color: #fc6663;
  border-Radius: 5px;
  padding: 5px;
`;

export const AnnotationText = styled.Text`
  font-Size: 14px;
  color: #fff;
`;

export const NewButtonContainer = styled.TouchableHighlight`
  position: absolute;
  bottom: 54px;
  left: 20px;
  right: 20px;
  align-Self: center;
  border-Radius: 5px;
  paddingVertical: 20px;
  background-Color: #fc6663;
`;

export const ButtonsWrapper = styled.View`
  position: absolute;
  bottom: 54px;
  left: 20px;
  right: 20px;
`;

export const CancelButtonContainer = styled.TouchableHighlight`
  align-Self: stretch;
  border-Radius: 5px;
  paddingVertical: 20px;
  background-Color: #555;
  margin-Top: 20px;
`;

export const SelectButtonContainer = styled.TouchableHighlight`
  align-Self: stretch;
  border-Radius: 5px;
  paddingVertical: 20px;
  background-Color: #fc6663;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-Size: 16px;
  text-Align: center;
  font-Weight: bold;
`;

export const Marker = styled.Image`
  width: 60px;
  height: 60px;
  position: absolute;
  align-Self: center;
  top: ${(Dimensions.get('window').height / 2) - 60}px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-Color: #FFF;
`;

export const ModalImagesListContainer = styled.View``;

export const ModalImagesList = styled.ScrollView`
  paddingHorizontal: 20px;
  padding-Top: 20px;
`;

export const ModalImageItem = styled.Image`
  height: 100px;
  width: 100px;
  margin-Right: 10px;
`;

export const ModalButtons = styled.View`
  paddingHorizontal: 10px;
  paddingVertical: 5px;
  flex-Direction: row;
  justify-Content: space-between;
`;

export const CameraButtonContainer = styled.TouchableHighlight`
  paddingVertical: 20px;
  paddingHorizontal: 40px;
`;

export const CancelButtonText = styled.Text`
  color: #333;
  font-Size: 18px;
  font-Weight: bold;
`;

export const ContinueButtonText = styled.Text`
  color: #fc6663;
  font-Size: 18px;
  font-Weight: bold;
`;

export const TakePictureButtonContainer = styled.TouchableHighlight`
  position: absolute;
  align-Self: center;
  bottom: 20px;
  width: 60px;
  height: 60px;
  background-Color: #FFF;
  border-Radius: 30px;
  align-Items: center;
  justify-Content: center;
`;

export const TakePictureButtonLabel = styled.View`
  width: 52px;
  height: 52px;
  border-Radius: 26px;
  background-Color: #fc6663;
`;

export const DataButtonsWrapper = styled.View`
  flex: 1;
  align-Items: center;
  justify-Content: center;
  paddingHorizontal: 20px;
`;

export const MarkerContainer = styled.View`
  width: 30px;
  height: 30px;
  align-Items: center;
  justify-Content: center;
  background-Color: #FFF;
  border-Radius: 15px;
`;

export const MarkerLabel = styled.View`
  width: 24px;
  height: 24px;
  border-Radius: 12px;
  background-Color: #7159C1;
`;

export const Form = styled.View`
  flex: 1;
  margin-Top: 20px;
`;

export const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 10px;
  border-Radius: 5px;
  background-Color: #FFF;
  align-Self: stretch;
  margin-Bottom: 10px;
  marginHorizontal: 20px;
  font-Size: 14px;
  border-Width: 1px;
  border-Color: #CCC;
`;

export const DetailsModalFirstDivision = styled.View`
  flex: 3;
  align-Items: center;
  justify-Content: center;
`;

export const DetailsModalSecondDivision = styled.View`
  flex: 4;
  align-Items: center;
  justify-Content: center;
`;

export const DetailsModalThirdDivision = styled.View`
  flex: 3;
  align-Items: center;
  justify-Content: center;
`;

export const DetailsModalBackButton = styled.Text`
  color: #fc6663;
  font-Size: 18px;
  font-Weight: bold;
`;

export const DetailsModalRealtyTitle = styled.Text`
  font-Size: 28px;
  font-Weight: bold;
  text-Align: center;
  margin-Bottom: 15px;
  marginHorizontal: 40px;
`;

export const DetailsModalRealtySubTitle = styled.Text`
  font-Size: 22px;
  text-Align: center;
  margin-Bottom: 15px;
  marginHorizontal: 40px;
`;

export const DetailsModalRealtyAddress = styled.Text`
  font-Size: 18px;
  color: #999;
  text-Align: center;
  marginHorizontal: 60px;
`;

export const DetailsModalPrice = styled.Text`
  color: #fc6663;
  font-Size: 28px;
  font-Weight: bold;
`;