import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  
} from "react-native";

export function Navbar({ currentPage }) {
  return (
    <View style={styles.containerHeader}>
      <Text
        style={{ ...styles.text }}
        onPress={() => {
          currentPage("info");
        }}
      >
        Infomations
      </Text>
      <Text
        style={{ ...styles.text, paddingLeft: 50 }}
        onPress={() => {
          currentPage("setting");
        }}
      >
        Settings
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    backgroundColor: "#c5c5c5",
    height: 107,
    // borderRadius: 44,
  },
  text: {
    fontSize: 30,
    borderWidth: 1,
    width: "50%",
    height: 107,
    padding: 30,
  },
  button: {
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#108248",
    width: "50%",
    height: 70,
  },
});
