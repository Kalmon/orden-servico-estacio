import { create } from 'zustand';
export const auxG = create((set) => ({
    servAndamento: [], //Serviços que estou fazendo
    setServAndamento: (newData) => {
        set((state) => ({ servAndamento: newData }));
    },
    servAbertos: [], //Serviços em aberto
    setServAbertos: (newData) => {
        set((state) => ({ servAbertos: newData }));
    },
    screen: 'login',
    setScreen: (newData) => {
        set((state) => ({ screen: newData }));
    },
    user: {
        id: null,
        Email: null,
        Nome: null,
        idSetor: null,
        ultLogin: null
    },
    setUser: (newData) => {
        set((state) => ({ user: newData }));
    },
    sistema: {},
    setSistema: (newData) => {
        set((state) => ({ sistema: newData }));
    },
}));


export const alertG = create((set) => ({
    lista: [

    ],
    remove: (indexRemov) => {
        set((state) => ({
            lista: state.lista.filter((el, index) => {
                return index != indexRemov
            })
        }))
    },
    push: (newAlert = {}) => {
        if (typeof newAlert.type == "undefined") newAlert.type = "blue";
        set((state) => ({
            lista: [...state.lista, newAlert]
        }))
    }
}));