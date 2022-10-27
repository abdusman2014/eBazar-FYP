import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Item from '../Model/Item';
import AppText from '../Components/AppText';
import defaultstyles from '../Config/styles'
import ViewMoreText from 'react-native-view-more-text';

const ItemDetailsScreen = (props, Item) => {

    function renderViewMore(onPress){
        return(
            <Text onPress={onPress}>View more</Text>
        )
    }

    function renderViewLess(onPress){
        return(
            <Text onPress={onPress}>View less</Text>
        )
    }

    function clickEventListener() {
        Alert.alert("Success", "Product has beed added to cart")
      }
    //console.log(Item.image);
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <Image source={require("../assets/images/sofa.jpg")}
        style={styles.productImg}
            resizeMode="contain"
        />
        <Text style={styles.name}>
            Mid Century Sofa 
        </Text>
        <AppText style={[defaultstyles.typography.h3, { fontWeight: "bold"}]}>Price</AppText>
        <Text style={styles.price}>Rs/- 20,000</Text>
        <AppText style={[defaultstyles.typography.h3, { fontWeight: "bold"}]}>Description</AppText>
        <ViewMoreText numberOfLines={2} renderViewMore={renderViewMore}
          renderViewLess={renderViewLess} style={styles.description}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
            natoque penatibus et magnis dis parturient montes, 
            nascetur ridiculus mus. Donec quam felis, ultricies nec
        </ViewMoreText>
            
        </View>
        <View style={styles.contentColors}>
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00BFFF"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF1493"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00CED1"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#228B22"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#20B2AA"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF4500"}]}></TouchableOpacity> 
        </View>

        <View style={styles.starContainer}>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={()=> clickEventListener()}>
              <Text style={styles.shareButtonText}>Add To Cart</Text>  
            </TouchableOpacity>
          </View> 
    </SafeAreaView>
  )
}

export default ItemDetailsScreen

const styles = StyleSheet.create({
    container:{
      flex:1,
      margin: 10
    },
    productImg:{
      width:'100%',
      height:200,
      marginTop: -40,
    },
    name:{
      fontSize:30,
      color:"#000000",
      fontWeight:'bold'
    },
    price:{
      marginTop:5,
      fontSize:18,
      color:"green",
      fontWeight:'bold'
    },
    description:{
      textAlign:'center',
      marginTop:5,
      color:"#696969",
      fontSize: 16,
    },
    star:{
      width:40,
      height:40,
    },
    btnColor: {
      height:30,
      width:30,
      borderRadius:30,
      marginHorizontal:3
    },
    btnSize: {
      height:40,
      width:40,
      borderRadius:40,
      borderColor:'#778899',
      borderWidth:1,
      marginHorizontal:3,
      backgroundColor:'white',
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    starContainer:{
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:10
    },
    contentColors:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:10
    },
    contentSize:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:10
    },
    separator:{
      height:2,
      backgroundColor:"#eeeeee",
      marginTop:10,
      marginHorizontal:30
    },
    shareButton: {
      marginTop:5,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    shareButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    },
    addToCarContainer:{
      marginHorizontal:30
    }
  });