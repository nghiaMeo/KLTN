import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({
  name,
  title,
  image,
  onPress,
  onPressSecondary,
  cardSize,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: 360 }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm}>{name}</Text>
          <Text style={styles.primaryTextSm}>{title}</Text>

        </View>
        <View>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onPressSecondary}
          >
            <Ionicons name="camera-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 150,
    height: 200,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 140,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    height: 140,
    width: 340,
    resizeMode: "cover",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: 20,
    fontWeight: "bold",
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerDisable: {
    backgroundColor: colors.muted,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
});
