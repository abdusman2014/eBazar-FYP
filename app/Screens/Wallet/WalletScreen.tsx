import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WalletCard from '../../Components/Wallet/WalletCard'

export default function WalletScreen(props) {
  return (
    <View>
      <WalletCard></WalletCard>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})