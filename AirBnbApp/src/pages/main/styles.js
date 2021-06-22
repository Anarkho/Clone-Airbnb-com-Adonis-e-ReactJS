import styled from 'styled-components';
import {Dimensions} from 'react-native'


export const Container = styled.View`
  flex: 1;
  background-color: #fc6663;
`;

export const AnnotationContainer = styled.View`
  align-Items: center;
  justify-Content: center;
  background-Color: #FC6663;
  border-Radius:5px;
  padding: 5px;
`;

export const AnnotationText = styled.Text`
  font-Size: 14px;
  color: #FFF;
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
