import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import * as getVoice from "../../api-services/thuam";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "../../firebase-config";
import { onValue } from "firebase/database";

const ProductList = ({
  category,
  price,
  title,
  image,
  qantity,
  onPressView,
  onPressEdit,
  onPressDelete,
}) => {
  const [writehour, SetHour] = useState(laykq?.[1] || "");
  const [laykq, setlaykq] = useState([]);
  const fetchAPI = async () => {
    const food = ref(database, "/GhiPhat/");
    onValue(food, (snapshot) => {
      const values = snapshot.val();
      setlaykq(Object.values(values));
    });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const handlePlayBtn = async () => {
    const currentPlaySound = await getVoice.get("PlaySound");
    const newPlaySound = currentPlaySound === 1 ? 0 : 1;
    await getVoice.update({ PlaySound: newPlaySound });
    if (newPlaySound === 1) {
      const currentRecSound = await getVoice.get("RecSound");
      if (currentRecSound === 2) {
        await getVoice.update({ RecSound: 0 });
      }
    }
  };
  const handleRecordBtn = async () => {
    const currentRecSound = await getVoice.get("RecSound");
    const newRecSound = currentRecSound === 2 ? 0 : 2;
    await getVoice.update({ RecSound: newRecSound });
    if (newRecSound === 2) {
      const currentPlaySound = await getVoice.get("PlaySound");
      if (currentPlaySound === 1) {
        await getVoice.update({ PlaySound: 0 });
      }
    }
  };

  return (
    <View style={styles.container} onPress={onPressView}>
      <View style={styles.innerContainer}>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>Máy Ghi Âm</Text>
          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Ghi Âm: </Text>
            <Text>{laykq[0]}</Text>
          </View>
          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Phát Âm: </Text>
            <Text>{laykq[1]}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => handleRecordBtn()}
        >
          <MaterialIcons name={"mic"} size={20} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.danger }]}
          onPress={() => handlePlayBtn()}
        >
          <MaterialIcons name={"play-arrow"} size={20} color={colors.white} />
        </TouchableOpacity>
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
    display: "flex",
    flexDirection: "column",
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
