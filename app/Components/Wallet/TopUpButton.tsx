import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import AppText from '../AppText';
import defaultStyles from "../../Config/styles";


export default function TopUpButton() {
  return (
    <View style={styles.container}>
      <AntDesign name="download" size={24} color="black" />
      <AppText style={defaultStyles.typography.body.md.semiBold}>Top Up</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor :'white',
        borderRadius: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        height: 35
    }
})