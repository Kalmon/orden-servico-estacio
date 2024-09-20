import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Button, Input } from '../utils';
import { Component } from 'react';
import CSS from '../style';

import ico_user from '../assets/icons/usuario.png';
import ico_faze from '../assets/icons/fazendo.png';
import ico_aber from '../assets/icons/abertos.png';
import { auxG } from '../global';
import FStorage from '../firebase';


export default function NAVBAR(props) {
  const aux = auxG();
  function screen(x) {
    aux.setScreen(x);
  }
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        elevation: 6,
        display: (aux.screen != 'login' ? '' : 'none'),
      }}>
      <View
        style={{
          ...CSS.navbar,
          ...{

          },
        }}>
        <TouchableOpacity
          style={{
            ...CSS.navbarItem,
            ...{
              backgroundColor: (aux.screen == 'abertos' ? '#F3F4F6' : '#FFF'),
            }
          }}
          onPress={() => {
            screen('abertos');
          }}>
          <Image
            source={ico_aber}
            style={CSS.navbarIcon}
          />
          <Text
            style={CSS.navbarTxt}>
            Abertos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...CSS.navbarItem,
            ...{
              backgroundColor: aux.screen == 'andamento' ? '#F3F4F6' : '#FFF',
            }
          }}
          onPress={() => {
            screen('andamento');
          }}>
          <Image
            source={ico_faze}
            style={CSS.navbarIcon}
          />
          <Text
            style={CSS.navbarTxt}>
            Andamento
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...CSS.navbarItem,
            ...{
              backgroundColor: aux.screen == 'usuario' ? '#F3F4F6' : '#FFF',
            }
          }}
          onPress={() => {
            screen('usuario');
          }}>
          <Image
            source={ico_user}
            style={CSS.navbarIcon}
          />
          <Text
            style={CSS.navbarTxt}>
            Usuario
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
