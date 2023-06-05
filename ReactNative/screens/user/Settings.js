import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg.png";
import ProductList from "../../component/ProductList/ProductList";
import SetTimeFood from "../../component/ProductList/SetTime";
import SetTurboWater from "../../component/ProductList/SetTurbo";
import * as getBom from "../../api-services/bomnuoc";
import * as getVoice from "../../api-services/thuam";

const ViewProductScreen = ({ navigation, route }) => {
  const [laykq, setlaykq] = useState({});

  const fetchAPI = async () => {
    const getAPI = await getVoice.get();
    setlaykq(Object.values(getAPI));
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleBomCao = async () => {
    const currentShut = await getBom.get();
    console.log(currentShut);
    const new1 = currentShut === 1 ? 0 : 1;
    await getBom.update({ BomNgoai :new1});
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addproduct");
          }}
        >
          <AntDesign name="plussquare" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Cài Đặt</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Tất Cả Cài Đặt</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <ProductList />
        <SetTimeFood />
        <SetTurboWater
          onHigh={() => {
            handleBomCao();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ViewProductScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
});
