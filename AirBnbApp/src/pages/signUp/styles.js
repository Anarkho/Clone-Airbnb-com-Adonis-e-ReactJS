import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #f5f5f5;
`;

const Logo = styled.Image`
  height: 30%;
  marginBottom: 40px;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #fff;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 16px;
`;

const ErrorMessage = styled.Text`
  text-Align: center;
  color: #ce2029;
  font-Size: 16px;
  margin-Bottom: 15px;
  marginHorizontal: 20px;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  border-Radius: 5px;
  background-Color: #fc6663;
  align-Self: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-Weight: bold;
  font-Size: 16px;
  text-Align: center;
`;

const SignInLink = styled.TouchableHighlight`
  padding: 10px;
  margin-Top: 20px;
`;

const SignInLinkText = styled.Text`
  color: #999;
  font-Weight: bold;
  font-Size: 16px;
  text-Align: center;
`;

export {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
};