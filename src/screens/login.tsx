import { View, Image, Text } from 'react-native';
import { Card, Button, Input, curl, md5, sys } from '../utils';
import { Component, createRef } from 'react';
import icon from '../assets/icon.png';
import FStorage from '../firebase';
import CSS from '../style';
import { auxG, alertG } from '../global';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SCREEN_login(props) {
  const INPUT_email = createRef();
  const INPUT_senha = createRef();
  const aux = auxG();
  const alert = alertG();

  sys.dbGet("Email").then(res => {
    INPUT_email.current.setValue(res)
  })
  sys.dbGet("Senha").then(res => {
    INPUT_senha.current.setValue(res)
  })


  const btnLogin = () => {
    console.log(`${INPUT_email.current.getValue()} - ${INPUT_senha.current.getValue()}`)
    FStorage.authFB(INPUT_email.current.getValue(), INPUT_senha.current.getValue()).then(async (res) => {
      sys.dbSet('User', res);
      sys.dbSet('Email', INPUT_email.current.getValue());
      sys.dbSet('Senha', INPUT_senha.current.getValue());

      //Obter dados do sistema
      FStorage.Sistema({ type: "get" }).then(res => {
        console.log(res)
        aux.setSistema(res);
      })


      FStorage.Serv({
        type: "abertos",
        callback: (res) => {
          aux.setServAbertos(res);
        }
      });

      FStorage.Serv({
        type: "andamento",
        callback: (res) => {
          aux.setServAndamento(res);
        }
      });

      //Abrir menu
      aux.setUser(res);
      aux.setScreen("main");
    }).catch(err => {
      console.error(err);
      alert.push({ head: "Erro", body: "Não foi possivel concluir login, verifique email e senha!", type: "red" });
    });
  };

  return (
    <View
      style={
        {
          justifyContent: 'center', //Centered vertically
          alignItems: 'center', //Centered horizontally
          height: '100%',
          width: '100%',
          display: aux.screen == 'login' ? '' : 'none',
        }
      }>
      <View
        style={{
          width: '70%',

        }}>
        <View style={CSS.card}>
          <View
            style={{
              justifyContent: 'center', //Centered vertically
              alignItems: 'center', //Centered horizontally
              marginTop: -30,
            }}>
            <Image
              source={icon}
              style={{
                width: 75,
                height: 75,
              }}
            />
          </View>
          <View style={CSS.cardBody}>
            <Input text="Email" type="default" ref={INPUT_email} />
            <Input text="Senha" type="password" ref={INPUT_senha} />
            <Button
              text="ENTRAR"
              onPress={() => {
                btnLogin();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
