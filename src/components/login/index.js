import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, Image, ImageBackground } from 'react-native';
import { Card, value, Input } from '@rneui/themed';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './style.js';

import LoginService from '../../services/LoginService.js';

import { useNavigation } from '@react-navigation/native';

import TelaInicialAdmin from '../Admin/TelaInicialAdmin/index.js';
import TelaInicialCliente from '../Cliente/TelaInicialCliente/index.js';
import UserService from '../../services/Services/UserService.js';

import { deletarDatabase } from '../../services/SQLiteDatabase.js';

export default function Login() {

  // Funções de criação inicial de database e inserção de usuários no sistema
  // deletarDatabase()
  // UserService.addFirstAdministrador();
  // UserService.addFirstCliente();
  // UserService.addFirstUsuario();
  // UserService.addSecondUsuario();


  // Criação de variáveis
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  // Funções e métodos de login ----------------------------------------

  // Função responsável por realizar o login ---------------------------
  const handleLogin = () => {
    // Lógica de login

    // Validação simples para verificar se o e-mail está preenchido
    if (email.trim() === '') {
      setErrorMessage("Oops! O e-mail é obrigatório.");
      return;
    }

    // Validação simples para verificar se a senha está preenchida
    if (senha.trim() === '') {
      setErrorMessage("Oops! A senha é obrigatória.");
      return;
    }

    // Verificar se e-mail e senha são válidos e existentes no BD interno
    LoginService.getDadosUsuarioByEmail(email)
      .then((usuario) => {
        if (usuario === null) {
          setErrorMessage("Oops! E-mail ou senha inválidos.");
        } else {
          if (usuario.senha === senha) {
            switch (usuario.tipo) {
              case 'ADMIN':
                navigation.navigate(TelaInicialAdmin, usuario);
                break;
              case 'CLIENTE':
                navigation.navigate(TelaInicialCliente, usuario);
                break;
            }
          } else {
            setErrorMessage("Oops! E-mail ou senha inválidos.");
          }
        }
      })
      // Realizando a tratativa do erro de login
      .catch((error) => {
        console.log('Erro ao obter informações do usuário:', error);
        setErrorMessage("Oops! Ocorreu um erro ao fazer o login.");
      });
  };

  return (
    // ImageBackground serve para estilizar a parte de background da página
    <ImageBackground
      source={require('../../../assets/background-pattern.png')}
      style={styles.background}
      resizeMode="repeat"
    >
       <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          source={require('../../../assets/header.png')}
          style={{ width: 350, height: 93, zIndex: 1 }}

        />
        <Card style={styles.card}>
          <Card.Title style={{
            fontSize: 30, fontWeight: 900
          }}>Entre na plataforma</Card.Title>
          <Card.Divider />
          <Input
            disabledInputStyle={{ background: "#ddd" }}
            leftIcon={<Icon name="email" size={15} color={'#374153'} />}
            placeholder="Seu e-mail"
            inputStyle={{
              color: "#374153"
            }}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            disabledInputStyle={{ background: "#ddd" }}
            leftIcon={<Icon name="lock" size={15} color={'#374153'} />}
            secureTextEntry={true}
            placeholder="Senha"
            inputStyle={{
              color: "#374153"
            }}
            value={senha}
            errorMessage={errorMessage}
            onChangeText={setSenha}
          />
          <Button
            title="Log in"
            onPress={handleLogin}
            buttonStyle={{
              backgroundColor: 'black',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </Card>
      </View>
    </ImageBackground>
  );
}
