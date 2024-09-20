import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Button, Input } from '../utils';
import { Component } from 'react';
import CSS from '../style';


import { alertG } from '../global';

export default function ALERTAS(props) {
  const sysAlert = alertG();

  return (
    <View
      style={{
        width: '75%',
        position: 'absolute',
        bottom: 5,
        right: 5,
        elevation: 10,
        display: (sysAlert.lista.length > 0 ? '' : 'none'),
      }}>
      {sysAlert.lista.map((alert, index) => {
        switch (CSS.type) {
          case "red":
            CSS.type = "#C81E1E";

            break;
          case "green":
            CSS.type = "#046C4E";

            break;
          default:
            CSS.type = "#1A56DB";
            break;
        }

        return (<View key={index} style={{ ...CSS.alert, ...{ borderColor: CSS.type } }}>
          <View style={{ ...CSS.alertHead, ...{ borderColor: CSS.type, backgroundColor: CSS.type } }}>
            <Text style={CSS.alertHTxt}>
              {alert.head}

            </Text>
            <Text onPress={() => {
              sysAlert.remove(index)
            }} style={{
              position: 'absolute',
              right: 8,
              top: 5
            }}>❌</Text>
          </View>
          <View style={CSS.alertBody}>
            <Text>{alert.body}</Text>
          </View>
        </View>)
      })}
    </View>
  );
}
