import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { Card, Button, Input, Select, curl, statusG } from '../utils';
import { Component, createRef } from 'react'
import icon from '../assets/icon.png';
import CSS from '../style'
import FStorage from '../firebase';




export default class MODAL_servicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            show: false,
            language: '',
            data: {},
            resolv: null,
            reject: null
        };
        this.INPUT_xDesc = createRef();
        this.INPUT_Status = createRef();
        this.resolv = null;
        this.reject = null;
    }
    open = (data = {}) => {
        return new Promise((resolv, reject) => {
            this.setState({ show: true });
            this.setState({ data: data });

            this.resolv = resolv;
            this.reject = reject;
        })

    }
    btnConfirm = () => {
        console.log("servH add");
        FStorage.ServH({
            type: "add",
            idServ: this.state.data.idServ,
            xDescricao: this.INPUT_xDesc.current.getValue(),
            xStatus: this.INPUT_Status.current.getValue().value
        }).then(res => {
            this.resolv(true);
            this.setState({ show: false });
        }).catch(err => {
            console.error(err);
        })
    }
    btn_close() {
        this.reject(true);
        this.setState({ show: false });
    }
    render() {
        return (
            <View
                style={{
                    ...CSS.modal,
                    ...{
                        display: (this.state.show ? '' : 'none'),
                        elevation: 9
                    }
                }}>
                <View style={CSS.card}>
                    <View style={CSS.cardHead}>
                        <Text style={CSS.cardHTxt}>NOVO STATUS</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 0, padding: 7 }} onPress={() => { this.btn_close() }} className="p-[10] rounded-tr-lg w-[16%] items-center bg-gray-100">
                            <Text className="text-gray-600">❌</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={CSS.cardBody}>
                        <Select ref={this.INPUT_Status} list={statusG.list} />
                        <Input ref={this.INPUT_xDesc} text="Observação" multilines="true" numberOfLines="5" type="default" />
                        <Button text="CONFIRMAR" onPress={() => {
                            this.btnConfirm()
                        }} />
                    </View>
                </View>
            </View>
        );
    }
}