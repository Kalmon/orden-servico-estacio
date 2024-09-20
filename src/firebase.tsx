import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, updateDoc, collection, query, where, onSnapshot, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { getAuth, Auth, initializeAuth, signInWithEmailAndPassword, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { sys } from './utils';

class FStorage {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCBDfGpZKOF3VqwtD8QD2g8oPd7R516uFg",
            authDomain: "oservicos-707b2.firebaseapp.com",
            projectId: "oservicos-707b2",
            storageBucket: "oservicos-707b2.appspot.com",
            messagingSenderId: "864780332582",
            appId: "1:864780332582:web:bc1facd67008e1595c80e7",
            measurementId: "G-M6YWBPKBTG"
        };
        if (getApps().length === 0) {
            this.App = initializeApp(firebaseConfig);
            this.authApp = initializeAuth(this.App, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            })
        } else {
            this.App = getApp();
            this.authApp = getAuth();
        }
    }

    authFB(email, password) {
        return new Promise((resolv, reject) => {
            signInWithEmailAndPassword(this.authApp, email, password)
                .then(async (userCredential) => {
                    this.DB = getFirestore();
                    this.tUser = userCredential.user;
                    this.User({ type: "login" }).then(res => {
                        resolv(res);
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(error.message);
                });
        });
    }

    //Usuarios - Todas ações
    async User(data = {}) {
        return new Promise((resolv, reject) => {
            let myCollection = doc(this.DB, "usuarios", `${this.tUser.uid}`);
            if (data.type == "login") {
                getDoc(myCollection).then(res => {
                    if (!res.exists()) {
                        setDoc(myCollection, {
                            Email: this.tUser.email,
                            Nome: "",
                            idSetor: "",
                            ultLogin: new Date().toJSON(),
                        });
                        resolv({
                            Email: this.tUser.email,
                            idUser: this.tUser.uid,
                            Nome: "",
                            idSetor: "",
                            ultLogin: new Date().toJSON()
                        })
                    } else {
                        resolv({ ...res.data(), ...{ idUser: res.id } });
                    }
                })
            } else if (data.type == "get") {

            } else if (data.type == "att") {

            } else if (data.type == "add") {

            }
        })
    }

    //Servicos - Todas ações
    async Serv(data = {}) {
        let myCollection = collection(this.DB, "servicos");
        if (data.type == "abertos") {
            onSnapshot(query(myCollection, where("ultStatus", "==", -1)), (snapshot) => {
                if (snapshot.empty) {
                    data.callback([]);
                } else {
                    data.callback(snapshot.docs.map(doc => {
                        return {
                            ...doc.data(), ...{ idServ: doc.id }
                        };
                    })
                    );
                }
            });
        } else if (data.type == "andamento") {
            onSnapshot(query(myCollection, where("idPara", "==", (await sys.dbGet('User')).idUser)), (snapshot) => {
                if (snapshot.empty) {
                    data.callback([]);
                } else {
                    data.callback(snapshot.docs.map(doc => {
                        return {
                            ...doc.data(), ...{ idServ: doc.id }
                        };
                    })
                    );
                }
            });
        }
    }

    ServH(data = {}) {
        return new Promise(async (resolv, reject) => {
            let myCollection = collection(this.DB, "servicos_historico");
            if (data.type == "get") {
                getDocs(query(myCollection, where("idServ", "==", data.idServ))).then(res => {
                    if (res.docs.length <= 0) {
                        resolv([]);
                    } else {
                        resolv(res.docs.map(doc => doc.data()));
                    }

                }).catch(res => {
                    console.error(res)
                })
            } else if (data.type == "add") {
                //Adicionar historico
                addDoc(myCollection, {
                    idServ: data.idServ,
                    xDescricao: data.xDescricao,
                    xStatus: data.xStatus,
                    xDe: (await sys.dbGet('User')).Nome,
                    Data: new Date().toJSON(),
                }).then(async res => {
                    //Mudar status do servico
                    updateDoc(doc(this.DB, "servicos", data.idServ), {
                        "ultStatus": data.xStatus,
                        "idPara": (data.xStatus >= 0 ? (await sys.dbGet('User')).idUser : "")
                    });
                    console.log(res)
                    resolv(true);
                }).catch(err => {
                    console.error(err)
                })
            }
        })
    }

    //Servicos - Todas ações
    Sistema(data = {}) {
        return new Promise(async (resolv, reject) => {
            let myCollection = doc(this.DB, "sistema", "main");
            if (data.type == "get") {
                getDoc(myCollection).then(res => {
                    if (!res.exists()) {
                        resolv({
                            Setores: []
                        })
                    } else {
                        resolv(res.data());
                    }
                })
            } else if (data.type == "update") {

            }
        })
    }

    getUser() {
        return new Promise((resolv, reject) => {
            this.lStore.collection;
            let myCollection = collection(this.lStore, "usuarios");
            onSnapshot(query(myCollection, where("Email", "==", `${this.tUser.email}`)), (snapshot) => {
                if (snapshot.empty) {
                    setDoc(doc(myCollection, `${this.tUser.uid}`), {
                        Nome: "",
                        idSetor: "",
                        ultLogin: new Date().toJSON(),
                    });
                    resolv({
                        Nome: "",
                        idSetor: "",
                        ultLogin: new Date().toJSON()
                    })
                } else {
                    resolv(snapshot.docs.map(doc => doc.data())[0]);
                }
            })
        })
    }

    getFS = () => {
        return this.lStore;
    };
}

export default new FStorage();