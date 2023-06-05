import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";

const ProductList = ({ onHigh }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.productTitle}>Tắt / Mở Bơm Nước </Text>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onHigh}
        >
          <MaterialIcons
            name="add-circle-outline"
            size={20}
            color={colors.white}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.warning }]}
          onPress={onMedium}
        >
          <MaterialIcons name="minimize" size={20} color={colors.white} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  ImageContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  productInfoContainer: {
    paddingLeft: 5,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    borderRadius: 5,
    elevation: 2,
  },
  productInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productInfoItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
  },
});
