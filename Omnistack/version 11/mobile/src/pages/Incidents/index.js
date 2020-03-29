import React, { useEffect, useState } from  'react';
import { Feather } from "@expo/vector-icons";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from '../../services/api';

import styles from './style';

import logo from '../../assets/logo.png';

export default function Incidents() {

    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0);

    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    async function getIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && total === incidents.length) {
            return;
        }

        setLoading(true);

        const response = await(api.get('incidents', {
            params: { page }
        }));
        setIncidents([ ...incidents, ...response.data ]);
        setTotal(response.headers['x-total-count']);
        setPage( page + 1);
        setLoading(false);
    }

    useEffect(function(){
        getIncidents();
    }, []);

    const navigation = useNavigation();

    function navigationToDetails(incident) {
        navigation.navigate('Details', { incident });
    }

   return (
        <View style = { styles.container }>

            <View style = { styles.header }>
                <Image source = { logo }></Image>
                <Text style = { styles.headerText}> Total de <Text style = { styles.headerTextBold} > { total } casos </Text>.</Text>
            </View>
            
            <Text style = { styles.title }> Bem-vindo! </Text>

            <Text style = { styles.description }> Escola um dos casos abaixo e salve o dia </Text>

            <FlatList 
                style = { styles.incidentList }
                showsVerticalScrollIndicator = { true }
                data = { incidents }
                onEndReached = { getIncidents }
                onEndReachedThreshold = {0.2}
                
                keyExtractor = { function(incident) {
                    return String(incident.id);
                }}
               
                renderItem = { function({ item }) {
                    return (
                        <View style = { styles.incident }>

                            <Text style = { styles.incidentProperty }> ONG: </Text>
                            <Text style = { styles.incidentValue}> { item.nameOng } </Text>

                            <Text style = { styles.incidentProperty }> Caso: </Text>
                            <Text style = { styles.incidentValue}> { item.titleIncidents } </Text>

                            <Text style = { styles.incidentProperty }> Valor: </Text>
                            <Text style = { styles.incidentValue}> 
                                { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.valueIncidents) } 
                            </Text>

                            <TouchableOpacity 
                                style = { styles.detailsButton }
                                onPress = { function() {
                                    navigationToDetails(item);
                                } }
                            >
                                <Text style = { styles.detailsButtonText }> Ver mais detalhes </Text> 
                                <Feather name = "arrow-right" size = {16} color = "#E02041"></Feather>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />

        </View>
   );
}