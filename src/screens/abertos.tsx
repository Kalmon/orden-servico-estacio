import { View, Image, Text, ScrollView } from 'react-native';
import { Card, Button, Input, difHours } from '../utils';
import { Component, createRef } from 'react';
import MServicos from '../modals/servico';
import { auxG } from '../global';
import CSS from '../style';
import FStorage from '../firebase';

export default function SCREEN_login(props) {
    const MODALServ = createRef();
    const aux = auxG();
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                display: (aux.screen == 'abertos' || aux.screen == 'andamento') ? '' : 'none',
            }}>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'end',
                    marginBottom: 5,
                    marginTop: 43,
                    display: aux.screen == 'abertos' ? '' : 'none',
                }}>
                <Button
                    text="ADICIONAR"
                    onPress={() => {
                        this.props.setScreen('main');
                    }}
                />
            </View>
            <ScrollView style={{
                padding: 8,
                marginBottom: 85,
                paddingTop: aux.screen == 'abertos' ? 0 : 45,
            }}>
                {(aux.screen == 'abertos' ? aux.servAbertos : (aux.screen == 'andamento' ? aux.servAndamento : [])).map((serv, index) => {
                    return (<View key={index} style={CSS.card}>
                        <View style={CSS.cardHead}>
                            <Text style={CSS.cardHTxt}>
                                <Text style={CSS.txtBold}>#{serv.nServ}</Text> - {serv.xSetor == "" ? 'NÃO DEFINIDO' : serv.xSetor}
                            </Text>
                        </View>
                        <View style={CSS.cardBody}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>De: </Text>
                                    {serv.xDe == null ? 'NÃO DEFINIDO' : serv.xDe}
                                </Text>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>Dia: </Text>
                                    {new Date().toJSON(serv.Data).split("T")[0]}
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>Para: </Text>
                                    {serv.xPara == null ? 'NÃO DEFINIDO' : serv.xPara}
                                </Text>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>Horario: </Text>
                                    {new Date().toJSON(serv.Data).split("T")[1].split(".")[0]}
                                </Text>
                            </View>
                            <Text style={{
                                ...CSS.txtSm,
                                ...CSS.txtGray700,
                                ...{
                                    textAlign: 'justify'
                                }
                            }}>
                                <Text style={CSS.txtBold}>Descrição: </Text>
                                {serv.xDescricao}
                            </Text>
                            <View className="flex flex-row justify-center mb-2">
                                <Text style={{
                                    ...CSS.txtBold,
                                    ...{
                                        textAlign: 'center',
                                        color: '#C81E1E'
                                    }
                                }}>
                                    {difHours(new Date().toJSON(serv.Data))} atrás
                                </Text>
                            </View>
                            <Button
                                text="VISUALIZAR"
                                onPress={() => {
                                    MODALServ.current.open(serv);
                                }}
                            />
                        </View>
                    </View>)
                })}
            </ScrollView>
            <MServicos ref={MODALServ} />
        </View>
    );
}
