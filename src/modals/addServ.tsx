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
        })
    }
    addUser() {

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
                    <View style={CSS.cardHead}>
                        <Text style={CSS.cardHTxt}>Adicionar serviço</Text>
                        <TouchableOpacity
                            style={{
                                ...CSS.cardTabItem,
                                ...{
                                    width: '16%',
                                }
                            }}
                            onPress={() => { this.setState({ show: false }); }}>
                            <Text>❌</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CSS.cardBody}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Input text="xDescricao" type="default" />
                            <Select text="Setor" list={[{ value: 0, label: "Prefeitura" }, { value: 1, label: "Prefeitura" }]} />
                            <Select text="Usuario" ref={this.INPUT_Status} />
                        </View>
                    </View>
                    <Button text="ADICIONAR" />
                </View>
                <Status ref={this.MStatus} />
            </View>
        );
    }
}