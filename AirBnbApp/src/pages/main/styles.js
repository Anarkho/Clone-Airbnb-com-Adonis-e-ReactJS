import styled from 'styled-components';
const Container = styled.View`
  flex: 1;
  background-color: #fc6663;
`;

const AnnotationContainer = styled.View`
  align-Items: center;
  justify-Content: center;
  background-Color: #FC6663;
  border-Radius:5px;
  padding: 5px;
`;

const AnnotationText = styled.Text`
  font-Size: 14px;
  color: #FFF;
`;

export { Container, AnnotationContainer, AnnotationText };