import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Status from './status';
import { Card, Button, Input, difHours, curl, statusG } from '../utils';
import { Component, createRef } from 'react'
import icon from '../assets/icon.png';
import CSS from '../style'
import { auxG } from '../global';
import FStorage from '../firebase';

export default class MODAL_servicos extends Component {
    constructor(props) {
        super(props);
        this.MStatus = createRef(Status);
        this.state = {
            count: 0,
            show: false,
            tab: 'descricao',
            data: {},
            dataH: [],
        };
        this.resolv = null;
        this.reject = null;
    }
    open(data = {}) {
        return new Promise((resolv, reject) => {
            this.resolv = resolv;
            this.reject = reject;

            this.setState({ data: data });
            this.setState({ show: true });
            this.refreshHist(data.idServ);
        })
    }
    refreshHist(idServ) {
        FStorage.ServH({ type: "get", idServ: idServ }).then(res => {
            console.log(res)
            this.setState({ dataH: res });
        }).catch(res=>{
            console.error(res)
        })
    }
    setTab(xTab) {
        if (this.state.tab != xTab) this.setState({ tab: xTab });
    }
    addStatus = () => {
        this.MStatus.current.open(this.state.data).then(async res => {
            this.refreshHist(this.state.data.idServ);
        });
    }
    render() {
        if (!this.state.show && Object.keys(this.state.data).length <= 0) return (<View></View>);
        return (
            <View
                style={{
                    ...CSS.modal,
                    ...{
                        paddingRight: 10,
                        paddingLeft: 10,
                        display: (this.state.show ? 'block' : 'none')
                    }
                }}>
                <View style={CSS.card}>
                    <View style={CSS.cardTab}>
                        <TouchableOpacity style={{
                            ...CSS.cardTabItem,
                            ...{
                                width: '42%',
                                backgroundColor: (this.state.tab == "descricao" ? "#F9FAFB" : "transparent")
                            }
                        }} onPress={() => { this.setTab("descricao") }}>
                            <Text style={CSS.txtGray700}>DESCRIÇÃO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            ...CSS.cardTabItem,
                            ...{
                                width: '42%',
                                backgroundColor: (this.state.tab == "status" ? "#F9FAFB" : "transparent")
                            }
                        }}
                            onPress={() => { this.setTab("status") }}>
                            <Text style={CSS.txtGray700}>Status</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...CSS.cardTabItem,
                                ...{
                                    width: '16%',
                                }
                            }}
                            onPress={() => { this.setState({ show: false }); }} className="p-[10] rounded-tr-lg w-[16%] items-center bg-gray-100">
                            <Text>❌</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CSS.cardBody}>
                        <View style={{ display: this.state.tab == "descricao" ? "" : "none" }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>De: </Text>
                                    {this.state.data.xDe == null ? 'NÃO DEFINIDO' : this.state.data.xDe}
                                </Text>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>Dia: </Text>
                                    {new Date().toJSON(this.state.data.Data).split("T")[0]}
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>Para: </Text>
                                    {this.state.data.xPara == null ? 'NÃO DEFINIDO' : this.state.data.xPara}
                                </Text>
                                <Text style={{
                                    ...CSS.txtSm,
                                    ...CSS.txtGray700
                                }}>
                                    <Text style={CSS.txtBold}>Horario: </Text>
                                    {new Date().toJSON(this.state.data.Data).split("T")[1].split(".")[0]}
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
                                {this.state.data.xDescricao}
                            </Text>
                            <View className="flex flex-row justify-center mb-2">
                                <Text style={{
                                    ...CSS.txtBold,
                                    ...{
                                        textAlign: 'center',
                                        color: '#C81E1E'
                                    }
                                }}>
                                    {difHours(new Date().toJSON(this.state.data.Data))} atrás
                                </Text>
                            </View>
                        </View>
                        <View style={{ display: this.state.tab == "status" ? "" : "none" }}>
                            <ScrollView style={{
                                maxHeight: 250
                            }} >
                                {this.state.dataH.map((hist, index) => {
                                    return (
                                        <View key={index} style={{
                                            ...CSS.card,
                                            ...{
                                                marginBottom: 5
                                            }
                                        }}>
                                            <View style={CSS.cardHead}>
                                                <Text style={{
                                                    ...CSS.txtGray700,
                                                    ...{
                                                        fontSize: 14,
                                                        width: '50%'
                                                    }
                                                }}>
                                                    <Text style={CSS.txtBold}>De: </Text> {hist.xDe}
                                                </Text>
                                                <Text style={{
                                                    ...CSS.txtGray700,
                                                    ...{
                                                        fontSize: 14,
                                                        width: '50%',
                                                        textAlign: 'right'
                                                    }
                                                }}>
                                                    <Text style={CSS.txtBold}>Data: </Text>{hist.Data}
                                                </Text>

                                            </View>
                                            <View style={CSS.cardBody}>
                                                <Text style={{
                                                    ...CSS.txtGray700,
                                                    ...CSS.txtBold,
                                                    ...{
                                                        marginBottom: 8,
                                                        marginTop: 8,
                                                        fontSize: 14,
                                                        width: '100%',
                                                        textAlign: 'center'
                                                    }
                                                }}>
                                                    <Text>📃</Text> {statusG.getTXT([hist.xStatus])?.label}
                                                </Text>
                                                <Text style={{
                                                    ...CSS.txtSm,
                                                    ...CSS.txtGray700,
                                                    ...{
                                                        textAlign: 'justify',
                                                        display: (hist.xDescricao != null ? '' : 'none')
                                                    }
                                                }}>{hist.xDescricao}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView >
                            <Button text="NOVO" onPress={this.addStatus} />
                        </View>
                    </View>
                </View>
                <Status ref={this.MStatus} />
            </View>
        );
    }
}