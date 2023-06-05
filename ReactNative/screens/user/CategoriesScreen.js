import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg.png";
import emptyBox from "../../assets/images/emptybox.png";
import { colors, network } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import CustomIconButton from "../../component/CustomIconButton/CustomIconButton.js";
import CustomButton from "../../component/CustomButton/CustomButton.js";

import ProductCard from "../../component/ProductCard/ProductCard";
import CustomInput from "../../component/CustomInput";

const CategoriesScreen = ({ navigation, data }) => {
  const [refeshing, setRefreshing] = useState(false);
  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product: product });
  };
  const category = [
    {
      _id: "62fe244f58f7aa8230817f89",
      title: "Meow1",
      image: require("../../assets/icons/garments.png"),
    },
    {
      _id: "62fe243858f7aa8230817f86",
      title: "Meow2",
      image: require("../../assets/icons/electronics.png"),
    },
    {
      _id: "62fe241958f7aa8230817f83",
      title: "Meow3",
      image: require("../../assets/icons/cosmetics.png"),
    },
    {
      _id: "62fe246858f7aa8230817f8c",
      title: "Meow4",
      image: require("../../assets/icons/grocery.png"),
    },
  ];
  const handleOnRefresh = () => {
    setRefreshing(true);
    // fetchProduct();
    // setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.jumpTo("home");
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>

        <View></View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          <View style={styles.cartItemCountContainer}>
            <Text style={styles.cartItemCountText}>2</Text>
          </View>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ padding: 0, paddingLeft: 20, paddingRight: 20 }}>
          <CustomInput
            radius={5}
            placeholder={"Search..."}
            // value={filterItem}
            // setValue={setFilterItem}
          />
        </View>
        <FlatList
          data={category}
          keyExtractor={(index, item) => `${index}-${item}`}
          horizontal
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              key={tab}
              text={tab.title}
              image={tab.image}
              // active={selectedTab?.title === tab.title ? true : false}
              onPress={() => {
                setSelectedTab(tab);
              }}
            />
          )}
        />


        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refeshing}
              onRefresh={handleOnRefresh}
            />
          }
          keyExtractor={(index, item) => `${index}-${item}`}
          contentContainerStyle={{ margin: 10 }}
          numColumns={2}
          renderItem={({ item: product }) => (
            <View
              style={[
                styles.productCartContainer,
                { width: (windowWidth - windowWidth * 0.1) / 2 },
              ]}
            >
              <ProductCard
                cardSize={"large"}
                name={product.title}
                image={`${network.serverip}/uploads/${product.image}`}
                price={product.price}
                quantity={product.quantity}
                onPress={() => handleProductPress(product)}
                onPressSecondary={() => handleAddToCat(product)}
              />
              <View style={styles.emptyView}></View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  cartBottomRightContainer: {
    padding: 30,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
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
    flex: 1,
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,

    justifyContent: "flex-start",
    flex: 1,
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
  productCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  noItemContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyBoxText: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
  },
  emptyView: {
    height: 20,
  },
});
