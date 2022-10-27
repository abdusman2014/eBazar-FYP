import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useMemo, useRef} from 'react'
import defaultStyles from "../Config/styles";
import AppText from './AppText';
import AppCategoryWithoutIcon from './AppCategory/AppCategoryWithoutIcon';
import HomeScreenMockData from '../MockData/HomeScreenMockData';
import {Slider} from '@miblanchard/react-native-slider';

const DEFAULT_VALUE = 0.2;

export default function FilterMenu() {
  
  const mockCategoryData = HomeScreenMockData.mockCategoryData;
  const mockCategoryWithOutImageData = HomeScreenMockData.mockCategoryWithOutImageData;
  const mockItemsData = HomeScreenMockData.mockItemsData;
  const [
    mockCategoryitemWithOutImageData,
    setMockCategoryitemWithOutImageData,
  ] = React.useState(mockCategoryWithOutImageData);

  const SliderContainer = (props: {
    caption: string;
    children: React.ReactElement;
    sliderValue?: number | Array<number>;
    trackMarks?: Array<number>;
}) => {
    const {caption, sliderValue, trackMarks} = props;
    const [value, setValue] = React.useState(
        sliderValue ? sliderValue : DEFAULT_VALUE,
    );
    let renderTrackMarkComponent: React.ReactNode;

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index: number) => {
            const currentMarkValue = trackMarks[index];

            const style =
                currentMarkValue >
                Math.max(Array.isArray(value) ? value[0] : value)
                    ? trackMarkStyles.activeMark
                    : trackMarkStyles.inactiveMark;
            return <View style={style} />;
        };
    }

    const renderChildren = () => {
        return React.Children.map(
            props.children,
            (child: React.ReactElement) => {
                if (!!child && child.type === Slider) {
                    return React.cloneElement(child, {
                        onValueChange: setValue,
                        renderTrackMarkComponent,
                        trackMarks,
                        value,
                    });
                }

                return child;
            },
        );
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View>
            {renderChildren()}
        </View>
    );
};

  return (
    <View style={styles.container}>
    
    <AppText style={[defaultStyles.typography.h2, { fontWeight: "bold"}]}>
      Sort & Filter
    </AppText>
    
    <AppText style={defaultStyles.typography.body.large.bold}>
      Categories
    </AppText>

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
      
      <AppText style={defaultStyles.typography.body.large.bold}>
        Price Range
      </AppText>
      
      <SliderContainer
                caption="<Slider/> with track marks"
                sliderValue={[1]}
                trackMarks={[3, 7, 11]}>
      <Slider
         animateTransitions
         minimumTrackTintColor="#30a935"
         thumbStyle={customStyles7.thumb}
         trackStyle={customStyles7.track}
         
         minimumValue={-10}
         maximumValue={42}
      />
    </SliderContainer>
      
      <AppText style={defaultStyles.typography.body.large.bold}>
        Sort by
      </AppText>
      

      
      <ScrollView //TODO: Change this view to display type of sorting  e.g. most popular, most recent, rather than categories 
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
        
        <AppText style={defaultStyles.typography.body.large.bold}>
          Rating
        </AppText>

        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
},
})

const customStyles7 = StyleSheet.create({
  thumb: {
      backgroundColor: 'rgba(150, 150, 150, 0.3)',
      borderColor: 'rgba(150, 150, 150, 0.6)',
      borderRadius: 15,
      borderWidth: 14,
      height: 30,
      width: 30,
  },
  track: {
      backgroundColor: '#303030',
      height: 1,
  },
});

const borderWidth = 4;
const trackMarkStyles = StyleSheet.create({
  activeMark: {
      borderColor: 'red',
      borderWidth,
      left: -borderWidth / 2,
  },
  inactiveMark: {
      borderColor: 'grey',
      borderWidth,
      left: -borderWidth / 2,
  },
});