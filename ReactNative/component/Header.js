import React, { memo } from "react";
import { StyleSheet,TouchableOpacity,SliderBox, ScrollView, Text, View, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../constants";
import easybuylogo from "../assets/images/logoebuy.png";
import cartIcon from "../assets/icons/cart_beg.png";
// import { useSelector, useDispatch } from "react-redux";

function Header() {
  // const cartproduct = useSelector((state) => state.product);

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity disabled>
          <Ionicons name="menu" size={35} color={colors.muted} />
      </TouchableOpacity>

      <View style={styles.topbarlogoContainer}>
          <Image source={easybuylogo} style={styles.logo} />
          <Text style={styles.toBarText}>Pet's Super Care</Text>
      </View>

      <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}>
          <Image source={cartIcon} />
      </TouchableOpacity>

      

    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor:"green",
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  topbarlogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
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

export default memo(Header);