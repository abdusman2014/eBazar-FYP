import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import AppCategoryWithIcon from "../Components/AppCategory/AppCategoryWithIcon";
import AppCategoryWithoutIcon from "../Components/AppCategory/AppCategoryWithoutIcon";
import AppItemComponent from "../Components/AppItemComponent";
import AppSearch from "../Components/AppSearch";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import AppSpecialOfferComponent from "../Components/AppSpecialOfferComponent";
import AppText from "../Components/AppText";
import AppTopBar from "../Components/AppTopBar";
import defaultStyles from "../Config/styles";

function HomeScreen(props) {
  const [text, onChangeText] = React.useState("Useless Text");
  const mockCategoryData = [
    { name: "Sofa", image: "../assets/images/sofa-icon.png" },
    { name: "Sofa", image: "../assets/images/sofa-icon.png" },
    { name: "Sofa", image: "../assets/images/sofa-icon.png" },
    { name: "Sofa", image: "../assets/images/sofa-icon.png" },
    { name: "Sofa", image: "../assets/images/sofa-icon.png" },
    { name: "Sofa", image: "../assets/images/sofa-icon.png" },
  ];
  const mockItemsData = [
    {
      //key: '1',
      name: "Two-seater gray sofa with two cushions, isolated",
      rating: 3.5,
      price: 1200,
      soldCount: 800,
      image: "../assets/images/sofa.jpg",
    },
    {
      //key: '2',
      name: "Two-seater gray sofa with two cushions",
      rating: 3.5,
      price: 1200,
      soldCount: 800,
      image: "../assets/images/sofa.jpg",
    },
    {
     // key: '3',
      name: "Two-seater gray sofa with two cushions, isolated",
      rating: 3.5,
      price: 1200,
      soldCount: 800,
      image: "../assets/images/sofa.jpg",
    },
  ];
  return (
    <SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AppTopBar />
        <AppSpaceComponent />
        <AppSearch onValueChange={onChangeText} />
        <AppSpaceComponent />
        <SectionHeader title={"Special Offers"} optionText={"See All"} />
        <AppSpaceComponent />
        <AppSpecialOfferComponent
          headerText={"25%"}
          subHeaderText={"Today's Special"}
          text={"Get discount for every order, only valid for today"}
          image={"../assets/images/sofa.jpg"}
        />
        <AppSpaceComponent />

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {mockCategoryData.map((val, key) => {
            return (
              <View style={{ padding: 12 }}>
                <AppCategoryWithIcon name={val.name} image={val.image} />
              </View>
            );
          })}
        </View>
        <AppSpaceComponent />
        <SectionHeader title={"Most Popular"} optionText={"See All"} />
        <AppSpaceComponent />
        <ScrollView
          style={{ flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {mockCategoryData.map((val, key) => {
            return (
              <View style={{ padding: 8 }}>
                <AppCategoryWithoutIcon name={val.name} isSelected={false} />
              </View>
            );
          })}
        </ScrollView>
        <AppSpaceComponent />
        
       <FlatList
       data={mockItemsData}
       style={{padding: 16}}
       //keyExtractor={(item, index) => index}
       numColumns={2}
       renderItem={(item)=>(
        <View style={{ marginBottom: 24 }}>
        <AppItemComponent item={mockItemsData[0]} />
      </View>
       )}
       />
        
        <AppSpaceComponent height={50} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    top: 12,
    //backgroundColor: 'red'
  },
});

function SectionHeader({ title, optionText }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <AppText style={defaultStyles.typography.body.large.bold}>
        {title}
      </AppText>
      <View style={{ flex: 1 }} />
      <AppText style={defaultStyles.typography.body.large.bold}>
        {optionText}
      </AppText>
    </View>
  );
}

export default HomeScreen;
