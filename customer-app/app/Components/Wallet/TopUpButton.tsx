import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import AppText from '../AppText';
import defaultStyles from "../../Config/styles";
import routes from '../../Navigation/routes';


export default function TopUpButton({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <AntDesign name="download" size={24} color="black" />
      <AppText style={defaultStyles.typography.body.md.semiBold}>Top Up</AppText>
    </Pressable>
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