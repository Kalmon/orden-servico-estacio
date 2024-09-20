import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Component } from 'react';
import CSS from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Button extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.color == 'red') {
        }
        return (
            <TouchableOpacity style={CSS.btn} onPress={this.props.onPress}>
                <Text style={CSS.btnTxt}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

export class Input extends Component {
    constructor(props) {
        super();
        this.state = {
            value: typeof props.value == "undefined" ? "" : typeof props.value
        }
    }

    getValue() {
        return this.state.value;
    }

    setValue(v) {
        this.setState({ value: v });
    }

    render() {
        return (
            <View
                style={{
                    padding: 3,
                    marginBottom: 5,
                    width: '100%',
                }}>
                <TextInput
                    style={{
                        height: typeof this.props.multilines != 'undefined' ? 120 : 40,
                        width: '100%',
                        padding: 5,
                        backgroundColor: '#F9FAFB',
                        borderColor: '#D1D5DB',
                        borderSize: 5,
                        borderWidth: 1,
                        fontSize: 14,
                        borderRadius: 10,
                    }}
                    multiline={
                        typeof this.props.multilines != 'undefined'
                            ? this.props.multilines == 'true'
                            : false
                    }
                    numberOfLines={
                        typeof this.props.lines != 'undefined' ? this.props.lines * 1 : 2
                    }
                    secureTextEntry={this.props.type == 'password' ? true : false}
                    keyboardType={
                        this.props.type == 'password' ? 'default' : this.props.type
                    }
                    defaultValue={this.state.value}
                    onChangeText={(txt) => { this.state.value = txt }}
                />
                <Text
                    style={{
                        backgroundColor: '#F9FAFB',
                        borderRadius: 10,
                        position: 'absolute',
                        left: 10,
                        top: -4,
                        fontSize: 14,
                    }}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}

export class Card extends Component {
    constructor() {
        super();
    }

    render() {
        if (typeof this.props.textH != 'undefined') {
            return (
                <View className="p-1 z-[1]">
                    <View className="bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[100%]">
                        <View className="container border-gray-300 border-b rounded-t-lg bg-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <Text className="p-[8] text-gray-600">{this.props.textH}</Text>
                        </View>
                        <View className="p-2  w-[100%]">{this.props.children}</View>
                    </View>
                </View>
            );
        } else {
            return (
                <View className="p-1 z-[1]">
                    <View className="bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[100%]">
                        <View className="p-2 w-[100%]">{this.props.children}</View>
                    </View>
                </View>
            );
        }
    }
}

export function difHours(t1) {
    let retMsg = [];
    var dateFuture = new Date(new Date().getFullYear() + 1, 0, 1);
    var dateNow = new Date(t1);
    var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    if (hours > 0) retMsg.push(`${hours}H`);
    if (minutes > 0) retMsg.push(`${minutes}Min`);
    return retMsg.join(", ");
}

export class Select extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            show: false,
        };
    }

    getValue() {
        return this.props.list[this.state.index];
    }

    setValue(index) {
        this.setState({ index: index });
        this.setState({ show: false });
    }

    render() {
        return (
            <SafeAreaView style={{
                padding: 5,
                zIndex: 2
            }}>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        padding: 5,
                        backgroundColor: '#F9FAFB',
                        borderColor: '#D1D5DB',
                        borderSize: 5,
                        borderWidth: 1,
                        fontSize: 14,
                        borderBottomLeftRadius: (this.state.show ? 0 : 10),
                        borderBottomRightRadius: (this.state.show ? 0 : 10),
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        this.setState({ show: !this.state.show });
                    }}>
                    <Text style={{
                        ...CSS.textGray700,
                        ...{
                            fontSize: 14,
                            padding: 7
                        }
                    }}>
                        {this.props.list[this.state.index].label}
                    </Text>
                    <Text style={{
                        left: '10%',
                        position: 'absolute'
                    }}>🔻</Text>
                </TouchableOpacity>
                <ScrollView
                    style={{
                        width: '100%',
                        maxHeight: 200,
                        position: 'absolute',
                        marginTop: 49,
                        zIndex: 1,
                        marginRight: 5,
                        marginLeft: 5,
                        backgroundColor: '#E5E7EB',
                        borderColor: '#D1D5DB',
                        borderSize: 5,
                        borderWidth: 1,
                        fontSize: 14,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        display: (this.state.show ? '' : 'none')
                    }}>
                    {this.props.list.map((el, index) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderColor: '#D1D5DB',
                                    borderBottomWidth: (index + 1 >= this.props.list.length ? 0 : 1),
                                }}
                                key={index}
                                onPress={() => {
                                    this.setValue(index);
                                }}>
                                <Text>{el.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                <Text
                    style={{
                        backgroundColor: '#F9FAFB',
                        borderRadius: 10,
                        position: 'absolute',
                        left: 10,
                        top: -4,
                        fontSize: 14,
                        display: typeof this.props.text != "undefined" ? "" : "none"
                    }}>
                    {this.props.text}
                </Text>
            </SafeAreaView>
        );
    }
}

export const curl = async (call, data = {}) => {
    // data : files = array, upload = function, abort = function
    if (typeof data.files == 'undefined') data.files = new Array();
    if (typeof data.upload == 'undefined') data.upload = null;
    if (typeof data.abort == 'undefined') data.abort = null;
    if (typeof data.body == 'undefined') data.body = {};
    if (typeof data.xhr == 'undefined') data.xhr = new XMLHttpRequest();

    if (typeof data.body.CPF == "undefined") {
        data.body.CPF = await sys.dbGet('CPF');
        data.body.Senha = md5(await sys.dbGet('Senha'));
    }

    return new Promise((resolv, reject) => {
        let formData = new FormData();
        Object.keys(data.body).forEach((key) => {
            formData.append(
                key,
                typeof data.body[key] == 'object'
                    ? JSON.stringify(data.body[key])
                    : data.body[key]
            );
        });
        data.files.forEach((file) => {
            formData.append('fileUpload[]', file);
        });
        formData.append('Call', call);

        if (data.upload != null) {
            data.xhr.upload.onprogress = data.upload;
        }

        if (data.abort != null) data.abort(data.xhr.abort);

        data.xhr.onabort = (xMotivo) => {
            reject(xMotivo);
        };
        data.xhr.open('POST', 'https://os.guaradev.com/api.php', true);
        data.xhr.onload = function (e) {
            let json = e.target.responseText;
            try {
                json = JSON.parse(json);
            } catch (error) { }

            if (e.target.status === 200) {
                resolv(json);
            } else {
                reject(json);
            }
        };
        //Servidor de requisi??o n?o respondeu
        data.xhr.onerror = async function () {
            reject({
                Err: 0,
                xMotivo: 'N?o foi possivel concluir a solicita??o.',
            });
        };
        data.xhr.send(formData);
    });
};

export const sys = {
    dbGet: async (x) => {
        return new Promise(async (resolv, reject) => {
            let jsonValue = await AsyncStorage.getItem(x);
            try {
                if (jsonValue == null) {
                    resolv(null);
                } else {
                    resolv(JSON.parse(jsonValue));
                }

            } catch (e) {
                resolv(jsonValue);
            }
        })
    },
    dbSet: async (x, v) => {
        return new Promise(async (resolv, reject) => {
            try {
                if (v == null) {
                    await AsyncStorage.setItem(x, v);
                } else {
                    await AsyncStorage.setItem(x, JSON.stringify(v));
                }
            } catch (e) {
                await AsyncStorage.setItem(x, v);
            }
            resolv(true);
        })
    }
}

export const statusG = {
    list: [
        {
            value: -1,
            label: "ABANDONAR"
        },
        {
            value: 0,
            label: "INICIAR"
        },
        {
            value: 1,
            label: "AGUARDAR"
        },
        {
            value: 2,
            label: "CONCLUIR"
        }
    ],
    getTXT: (val) => {
        let temp = [
            {
                value: -1,
                label: "ABANDONAR"
            },
            {
                value: 0,
                label: "INICIAR"
            },
            {
                value: 1,
                label: "AGUARDAR"
            },
            {
                value: 2,
                label: "CONCLUIR"
            }
        ];
        for (let cont = 0; cont <= temp.length; cont++) {
            if (temp[cont].value == val) {
                return temp[cont];
            }
        }
    }
}

export const md5 = function (d) {
    var subMD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
    return subMD5(d);
}