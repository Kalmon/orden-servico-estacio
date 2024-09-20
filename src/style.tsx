export default {
    input: {},
    inputTxt: {},
    alert: {
        backgroundColor: '#FFF',
        borderSize: 0,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: '100%'
    },
    alertHead: {
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'start',
        padding: 7
    },
    alertHTxt: {
        fontSize: 14,
        color: '#F3F4F6'
    },
    alertBody: {
        padding: 5,
    },
    card: {
        backgroundColor: '#FFF',
        borderSize: 0,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: '100%',
        borderColor: '#9CA3AF',
    },
    cardHead: {
        backgroundColor: '#9CA3AF',
        borderColor: '#9CA3AF',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'start',
        padding: 7,
    },
    cardTab: {
        flexDirection: 'row',
        borderColor:'#E5E7EB',
        borderBottom: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#D1D5DB',
        paddingTop:5,
        paddingLeft:5,
        paddingRight:5
    },
    cardTabItem: {
        padding:10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtGray700: {
        color: '#374151'
    },
    txtSm:{
        fontSize: 13
    },
    txtBold:{
        fontWeight: "bold"
    },
    cardHTxt: {
        fontSize: 14,
        color: '#F3F4F6',
    },
    cardBody: {
        padding: 5,
    },
    btn: {
        backgroundColor: '#374151',
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
    },
    btnTxt: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 14,
        paddingRight: 25,
        paddingLeft: 25,
        paddingTop: 12,
        paddingBottom: 12,
    },
    navbar: {
        zInedx: 5,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderColor: '#D1D5DB',
        borderTopWidth: 1,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    navbarItem: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        width: '33%',
        padding: 10
    },
    navbarIcon: {
        width: 45,
        height: 45,
    },
    navbarTxt: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 5,
    },
    modal:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex:10,
        elevation:7
    }
};
