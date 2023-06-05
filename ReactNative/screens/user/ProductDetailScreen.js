import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg.png";
import { colors, network } from "../../constants";
import CustomButton from "../../component/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../component/CustomAlert/CustomAlert";
import { database } from "../../firebase-config";
import { onValue } from "firebase/database";

const ProductDetailScreen = ({ navigation, route }) => {
  const [printd64, setPdata64] = useState("");
  useEffect(() => {
    const camera_stream_ref = ref(database, "/camera_stream/stream");
    onValue(camera_stream_ref, (snapshot) => {
      setPdata64(snapshot.val());
    });

    // return () => database().ref("/camera_stream/stream").off(onValueChange);
  });

  const [laykq, setlaykq] = useState([]);
  const fetchAPI = async () => {
    const food = ref(database, "/WaterSenSor/");
    onValue(food, (snapshot) => {
      const values = snapshot.val();
      setlaykq(Object.values(values));
    });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const [laykq2, setlaykq2] = useState([]);
  const fetchAPI2 = async () => {
    const food2 = ref(database, "/Food");
    onValue(food2, (snapshot) => {
      const values2 = snapshot.val();
      setlaykq2(Object.values(values2));
    });
  };
  useEffect(() => {
    fetchAPI2();
  }, []);

  const [laykq4, setlaykq4] = useState(0);
  const fetchAPI4 = async (day, month, year) => {
    const dayc = new Date().getDate(); //Current Date
    const monthc = new Date().getMonth() + 1; //Current Month
    const yearc = new Date().getFullYear(); //Current Year
    const formattedMonth = monthc < 10 ? "0" + monthc : monthc;
    const formattedMonth2 = month < 10 ? "0" + month : month;
    if (yearc == year && formattedMonth == month && dayc == day) {
      let dem = 0;
      const food4 = ref(
        database,
        `/cat_eat/${day}-${formattedMonth2}-${year}/`
      );
      onValue(food4, (snapshot) => {
        const values4 = Object.values(snapshot.val());
        for (let i = 0; i < values4.length; i++) {
          if (values4[i] == "yes") {
            dem++;
          }
        }
        setlaykq4(dem);
      });
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    fetchAPI4(currentDay, currentMonth, currentYear);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>

      <View style={styles.topBarContainer}>
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

        <View></View>
        <TouchableOpacity style={styles.cartIconContainer}>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.productImageContainer}>
          {/* <Image source={{ uri: `file://${pathImg}` }} style={styles.productImage} /> */}
          <Image
            source={{ uri: `data:image/png;base64,${printd64}` }}
            style={styles.productImage}
          />
        </View>
        <CustomAlert />

        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoTopContainer}>
            <View style={styles.productNameContaier}>
              <Text style={styles.productNameText}>Thông Tin Mèo</Text>
            </View>

            <View style={styles.productNameContaier}>
              <Ionicons name="paw" size={25} color={colors.danger} />
              <Text style={styles.secondaryTextSm}>
                {" "}
                Số Lần Mèo Ăn Trong Ngày :{" "}
              </Text>
              <Text style={styles.counterCountText}>{laykq4}</Text>
            </View>

            <View style={styles.productNameContaier}>
              <Ionicons name="paw" size={25} color={colors.danger} />
              <Text style={styles.secondaryTextSm}> Mức Thức Ăn Dự Trữ : </Text>
              <Text style={styles.counterCountText}>{laykq2}</Text>
            </View>

            <View style={styles.productNameContaier}>
              <Ionicons name="paw" size={25} color={colors.danger} />
              <Text style={styles.secondaryTextSm}> Mức Nước Dự Trữ : </Text>
              <Text style={styles.counterCountText}>{laykq[1]}</Text>
            </View>
          </View>

          <View style={styles.productInfoBottomContainer}>
            <View style={styles.productButtonContainer}>
              <CustomButton
                style={styles.secondaryTextSm}
                text={"Settings"}
                onPress={() => navigation.navigate("settings")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    position: "relative",
    width: "100%",
    height: 600,
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  productImageContainer: {
    position: "absolute",
    width: "100%",
    height: 300,
    backgroundColor: colors.light,
    flexDirecion: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },

  productInfoContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 25,
  },
  productImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    resizeMethod: "resize",
  },
  productInfoTopContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  productInfoBottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.light,
    width: "100%",
    height: 120,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  productButtonContainer: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: colors.white,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productNameContaier: {
    padding: 5,
    paddingLeft: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  productNameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wishlistButtonContainer: {
    height: 50,
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetailContainer: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },
  secondaryTextSm: { fontSize: 17 },
  primaryTextSm: { color: colors.primary, fontSize: 15, fontWeight: "bold" },

  productDescriptionContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  counterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 50,
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  counterButtonContainer: {
    display: "flex",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.muted,
    borderRadius: 15,
    elevation: 2,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  counterCountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
});
