import { async } from "@firebase/util";
import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SearchableDropdown,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Repeat from "react-native-vector-icons/Feather";
import * as humidityServices from "../api-services/humidityService";
import scanIcon from "../assets/icons/scan_icons.png";

function Body() {

  return (
    <View style={styles.bodyContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => handleProductPress(item)}
              defaultIndex={0}
              containerStyle={{
                borderRadius: 5,
                width: "100%",
                elevation: 5,
                position: "absolute",
                zIndex: 20,
                top: -20,
                maxHeight: 300,
                backgroundColor: colors.light,
              }}
              textInputStyle={{
                borderRadius: 10,
                padding: 6,
                paddingLeft: 10,
                borderWidth: 0,
                backgroundColor: colors.white,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: colors.white,
                borderColor: colors.muted,
              }}
              itemTextStyle={{
                color: colors.muted,
              }}
              itemsContainerStyle={{
                maxHeight: "100%",
              }}
              placeholder="Search..."
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan</Text>
              <Image source={scanIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>

          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.promotiomSliderContainer}>
              <SliderBox
                images={slides}
                sliderBoxHeight={140}
                dotColor={colors.primary}
                inactiveDotColor={colors.muted}
                paginationBoxVerticalPadding={10}
                autoplayInterval={6000}
              />
            </View>
          </ScrollView>



        </View>

        
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",

    paddingBottom: 0,
    flex: 1,
  },
  cartBottomRightContainer: {
    padding: 30,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    height: "100%",
  },
  searchContainer: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    width: "100%",
  },
  scanButtonText: {
    fontSize: 15,
    color: colors.light,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  promotiomSliderContainer: {
    margin: 5,
    height: 140,
    backgroundColor: colors.light,
  },
  primaryTextContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Body;
