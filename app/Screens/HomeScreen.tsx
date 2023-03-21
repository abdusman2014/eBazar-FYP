import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import Lottie from "lottie-react-native";


import AppCategoryWithIcon from "../Components/AppCategory/AppCategoryWithIcon";
import AppCategoryWithoutIcon from "../Components/AppCategory/AppCategoryWithoutIcon";
import AppItemComponent from "../Components/AppItemComponent";
import AppSearch from "../Components/AppSearch";
import AppSpaceComponent from "../Components/AppSpaceComponent";
import AppSpecialOfferComponent from "../Components/AppSpecialOfferComponent";
import AppText from "../Components/AppText";
import AppTopBar from "../Components/AppTopBar";
import FilterMenu from "../Components/FilterMenu";
import defaultStyles from "../Config/styles";
import HomeScreenMockData from "../MockData/HomeScreenMockData";
import { useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import List from "../Components/List";
import routes from "../Navigation/routes";
import Item from "../Model/Item";
import firebase from "../../firebase";
import Category from "../Model/Category";
import useAuth from "../auth/useAuth";
function HomeScreen(props) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const auth = useAuth();
  const mockCategoryData = HomeScreenMockData.mockCategoryData;
  const mockCategoryWithOutImageData =
    HomeScreenMockData.mockCategoryWithOutImageData;
  const mockItemsData = HomeScreenMockData.mockItemsData;
  const [
    mockCategoryitemWithOutImageData,
    setMockCategoryitemWithOutImageData,
  ] = useState(mockCategoryWithOutImageData);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Items")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
          const data:Item[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const item:Item = documentSnapshot.data()
          data.push( item);
        });
        console.log('data no: ',data.length);
        setItems(data);
        setIsLoadingItems(false);
      });
      firebase
      .firestore()
      .collection("Category")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
          const data:Item[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const category:Category = documentSnapshot.data()
          data.push( category);
        });
        console.log('data no: ',data.length);
        setCategories(data);
        setIsLoadingCategories(false);
      });
  }, []);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const initialSnapPoints = useMemo(() => ["-1", "CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  if (isLoadingItems || isLoadingCategories) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ height: 100 }} />
        <Lottie
          source={require("../assets/progress.json")}
          autoPlay
          loop
          style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppTopBar />
        <AppSpaceComponent height={undefined} />
        <AppSearch
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          onValueChange={onChangeText}
          onFilterPress={() => {
            bottomSheetRef.current?.expand();
          }}
        />

        <AppSpaceComponent height={undefined} />
        <SectionHeader title={"Special Offers"} optionText={"See All"} />
        <AppSpaceComponent height={undefined} />
        <AppSpecialOfferComponent
          headerText={"25%"}
          subHeaderText={"Today's Special"}
          text={"Get discount for every order, only valid for today"}
          image={"../assets/images/sofa.jpg"}
        />
        <AppSpaceComponent height={undefined} />

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {categories?.map((val, key) => {
            return (
              <View style={{ padding: 12 }}>
                <AppCategoryWithIcon name={val.name} image={val.image} />
              </View>
            );
          })}
        </View>
        <AppSpaceComponent height={undefined} />
        <SectionHeader title={"Most Popular"} optionText={"See All"} />
        <AppSpaceComponent height={undefined} />
        <ScrollView
          style={{ flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {mockCategoryitemWithOutImageData.map((val, key) => {
            return (
              <Pressable
                style={{ padding: 8 }}
                onPress={async() => {
                 await auth.logOut();
                 props.navigation.replace(routes.SIGN_SCREEN);
                  // const category = [...mockCategoryitemWithOutImageData];
                  // category[key].isSelected = !category[key].isSelected;
                  // setMockCategoryitemWithOutImageData([...category]);
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
        <AppSpaceComponent height={undefined} />

        <FlatList
          data={items}
          style={{ padding: 16 }}
          keyExtractor={(item, index) => item.item_id}
          numColumns={2}
          renderItem={(item) => (
            <View style={{ marginBottom: 24 }}>
              <AppItemComponent
                item={item.item}
                onPress={() => {
                  const product: Item = item.item;
                  console.log(item.item);
                  props.setItem(product);
                  console.log(props.item);
                  props.navigation.navigate(routes.ITEM_DETAILS_SCREEN);
                }}
              />
            </View>
          )}
        />

        <AppSpaceComponent height={50} />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={animatedSnapPoints}
        onChange={handleSheetChanges}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}
      >
        <BottomSheetView
          //style={styles.contentContainer}
          onLayout={handleContentLayout}
        >
          <FilterMenu
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    top: 32,
    backgroundColor: defaultStyles.Colors.white,
    paddingHorizontal: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
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
