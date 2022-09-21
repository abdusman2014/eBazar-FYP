import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
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
import HomeScreenMockData from "../MockData/HomeScreenMockData";

function HomeScreen(props) {
  const [text, onChangeText] = React.useState("Useless Text");
  const mockCategoryData = HomeScreenMockData.mockCategoryData;
  const mockCategoryWithOutImageData = HomeScreenMockData.mockCategoryWithOutImageData;
  const mockItemsData = HomeScreenMockData.mockItemsData;
  const [
    mockCategoryitemWithOutImageData,
    setMockCategoryitemWithOutImageData,
  ] = React.useState(mockCategoryWithOutImageData);

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
          {mockCategoryitemWithOutImageData.map((val, key) => {
            return (
              <Pressable
                style={{ padding: 8 }}
                onPress={() => {
                  const category = [...mockCategoryitemWithOutImageData];
                  category[key].isSelected = !category[key].isSelected;
                  setMockCategoryitemWithOutImageData([...category]);
                }}
              >
                <AppCategoryWithoutIcon
                  name={val.name}
                  isSelected={val.isSelected}
                />
              </Pressable>
            );
          })}
        </ScrollView>
        <AppSpaceComponent />

        <FlatList
          data={mockItemsData}
          style={{ padding: 16 }}
          //keyExtractor={(item, index) => index}
          numColumns={2}
          renderItem={(item) => (
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
    backgroundColor: defaultStyles.Colors.white,
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
