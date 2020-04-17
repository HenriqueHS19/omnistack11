import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 48,
        marginBottom: 16,
    },

    incidentProperty: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#41414d',
        marginTop: 24
    },

    incidentValue: {
        fontSize: 15,
        color: '#737380',
        marginTop: 8,
    },

    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },

    heroTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#13131a',
        lineHeight: 30
    },

    heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },

    actionsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    btnAction: {
        width: '48%',
        height: 50,
        backgroundColor: '#E02041',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    txtBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',

    }

});