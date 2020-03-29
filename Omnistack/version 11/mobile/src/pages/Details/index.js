import React from  'react';
import { View, Image, TouchableOpacity, Text, Linking } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

import styles from './style';

import logo from '../../assets/logo.png';
import style from '../Incidents/style';

export default function Incidents() {

   const navigation = useNavigation();
   const route = useRoute();

   const incident = route.params.incident;

   function navigationBack() {
      navigation.goBack();
   }

   const message = `Olá ${ incident.nameOng }! Estou entrando em contato pois gostaria de ajudar no caso "${ incident.titleIncidents }" com o valor de ${ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.valueIncidents) }`;

   function sendMail() {
      MailComposer.composeAsync({
         subject: 'Heroi do caso: ' + incident.titleIncidents,
         recipients: [ incident.emailOng ],
         body: message
      });
   }

   function sendWhatsapp() {
      Linking.openURL('whatsapp://send?phone=' + incident.whatsAppOng + '&text=' + message);
   }

   return (

      <View style = { styles.container }>
        
         <View style = { styles.header }>
            
            <Image source = { logo } ></Image>

            <TouchableOpacity 
               style = { styles.btnBack }
               onPress = { navigationBack }
            >
               <Feather name = "arrow-left" size = {28} color = "#E02041"></Feather> 
            </TouchableOpacity>
         </View>

         <View style = { styles.incident }>

            <Text style = { [ styles.incidentProperty, { marginTop: 0 } ] }> ONG: </Text>
            <Text style = { styles.incidentValue}> { incident.nameOng } de { incident.cityOng}, { incident.ufOng } </Text>

            <Text style = { styles.incidentProperty }> Caso: </Text>
            <Text style = { styles.incidentValue}> { incident.titleIncidents } </Text>

            <Text style = { styles.incidentProperty}> Descrição: </Text> 
            <Text style = { styles.incidentValue}> { incident.descriptionIncidents } </Text>

            <Text style = { styles.incidentProperty }> Valor: </Text>
            <Text style = { styles.incidentValue}> { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.valueIncidents) } </Text>

         </View>

         <View style = { styles.contactBox }>

            <Text style = { styles.heroTitle }> Salve o dia! </Text>
            <Text style = { styles.heroTitle }> Seja o heroi desse caso. </Text>

            <Text style = { styles.heroDescription }> Entre em contato: </Text>

            <View style = { styles.actionsGroup }>

               <TouchableOpacity 
                  style = { styles.btnAction }
                  onPress = { sendWhatsapp }
               >
                  <Text style = { styles.txtBtn }> Whatsapp </Text>
               </TouchableOpacity>

               <TouchableOpacity 
                  style = { [ styles.btnAction, { marginLeft: 10 } ] }
                  onPress = { sendMail }
               >
                  <Text style = { styles.txtBtn }> E-mail </Text>
               </TouchableOpacity>

            </View>
         </View>

      </View>

   );
}