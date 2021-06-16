import React, { Component } from 'react';

import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
} from './styles';

class SignIn extends Component {

    static navigationOptions = {
        header: '',
    };

    constructor(props) {
        super(props)
        this.state = { email: '', password: '', error: '' };
    }



    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SignUp')
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
            try {
                const response = await api.post('/sessions', {
                    email: this.state.email,
                    password: this.state.password,
                });

                await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);

                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
                this.props.navigation.navigate('Main')

                console.log('criando')
            } catch (_err) {
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
            }
        }
    };


    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Logo source={require('../../images/airbnb_logo.png')} resizeMode="contain" />
                <Input
                    placeholder="Endereço de e-mail"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="Senha"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
                {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
                <Button onPress={this.handleSignInPress}>
                    <ButtonText>Entrar</ButtonText>
                </Button>
                <SignUpLink onPress={this.handleCreateAccountPress}>
                    <SignUpLinkText>Criar conta grátis</SignUpLinkText>
                </SignUpLink>
            </Container>
        );
    }
}

export default SignIn