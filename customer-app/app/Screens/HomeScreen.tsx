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
import userStore from "../state-management/AppUser";
function HomeScreen(props) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [popularItem, setPopularItem] = useState(null);
  const { setUser, user } = userStore();
  const mockCategoryData = HomeScreenMockData.mockCategoryData;
  const mockCategoryWithOutImageData =
    HomeScreenMockData.mockCategoryWithOutImageData;
  const mockItemsData = HomeScreenMockData.mockItemsData;
  const [
    mockCategoryitemWithOutImageData,
    setMockCategoryitemWithOutImageData,
  ] = useState(mockCategoryWithOutImageData);

  useEffect(() => {
    // fetch(
    //   "http://192.168.72.240:4000/recommendedItems?userId=uhN2qKUWMZRgkoUsE3IQ9dVttCh2"
    // ).then((res) => {
    //   console.log(res.json);
    // });
    fetch("http://192.168.10.8:4000/popular")
      .then((res) => res.json())
      .then(res =>{
        firebase
          .firestore()
          .collection("Items")
          .where("item_id", "==", res)
          .get()
          .then((querySnapshot) => {
             console.log("Total users: ", querySnapshot.size);
            const data: Item[] = [];
            querySnapshot.forEach((documentSnapshot) => {
              const item: Item = documentSnapshot.data();
              setPopularItem(item);
              //data.push(item);
            });
            // console.log("data no: ", data.length);
            //setItems(data);
            //setIsLoadingItems(false);
          });
      })
      
      .catch((err) => {
        console.log("err: ", err);
      });
    fetch("http://192.168.10.8:4000/recommendedItems?userId=" + user?.uid)
      .then((res) => res.json())
      .then((res) => {
        //console.log("reco: ",res);

        firebase
          .firestore()
          .collection("Items")
          .where("item_id", "in", res)
          .get()
          .then((querySnapshot) => {
            // console.log("Total users: ", querySnapshot.size);
            const data: Item[] = [];
            querySnapshot.forEach((documentSnapshot) => {
              const item: Item = documentSnapshot.data();
              data.push(item);
            });
            // console.log("data no: ", data.length);
            setItems(data);
            setIsLoadingItems(false);
          });
      })
      .catch((err) => {
        console.log("err: ", err);
      });

    firebase
      .firestore()
      .collection("Category")
      .get()
      .then((querySnapshot) => {
        // console.log("Total users: ", querySnapshot.size);
        const data: Item[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const category: Category = documentSnapshot.data();
          data.push(category);
        });
        // console.log("data no: ", data.length);
        setCategories(data);
        setIsLoadingCategories(false);
      });
  }, []);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  useEffect(() => {
    bottomSheetRef.current?.close();
  }, []);
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            height: 100,
          }}
        />
        <Lottie
          source={require("../assets/progress.json")}
          autoPlay
          loop
          //style={{ height: 100, width: 100 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 8 }}>
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
       {popularItem && <AppSpecialOfferComponent
          headerText={"Trending"}
          subHeaderText={popularItem.name}
          text={popularItem.description}
          image={popularItem.image}
          onPress={() => {
            //const product: Item = item.item;
           // console.log(item.item);
            props.setItem(popularItem);
           // console.log(props.item);
            props.navigation.navigate(routes.ITEM_DETAILS_SCREEN);
          }}
        />}
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
                key={key}
                style={{ padding: 8 }}
                onPress={() => {
                  // setUser(null);
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
        <AppSpaceComponent height={undefined} />

        <FlatList
          nestedScrollEnabled={true}
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

    top: 42,
    backgroundColor: defaultStyles.Colors.white,
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
