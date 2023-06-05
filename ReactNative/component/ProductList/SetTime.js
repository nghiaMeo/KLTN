import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "../../firebase-config";
import { onValue } from "firebase/database";

import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { RadioButton } from "react-native-paper";
import * as getTime from "../../api-services/laytime";

const ProductList = ({ onPressEdit, onPressDelete }) => {
  const [checked, setChecked] = useState("1"); //initial choice
  const [writehour, SetHour] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const handlePress = (a) => {
    if (a == 1) {
      SetHour(`${laykq[1]}:${laykq[8]}`);
    } else if (a == 2) {
      SetHour(`${laykq[2]}:${laykq[9]}`);
    } else if (a == 3) {
      SetHour(`${laykq[0]}:${laykq[7]}`);
    }
  };

  const SetEdit = async () => {
    const timeString = writehour;
    const [hour, minute] = timeString.split(":");
    const currentHourMorning = await getTime.get("GioSang");
    const currentMinutesMorning = await getTime.get("PhutSang");
    const currentHourLunch = await getTime.get("GioTrua");
    const currentMinutesLunch = await getTime.get("PhutTrua");
    const currentHourEvening = await getTime.get("GioChieu");
    const currentMinutesEvening = await getTime.get("PhutChieu");
    const SetMucAnSang = await getTime.get("LevelSang");
    const SetMucAnTrua = await getTime.get("LevelTrua");
    const SetMucAnChieu = await getTime.get("LevelChieu");

    if (hour >= 1 && hour <= 10) {
      const newHourMorning = hour;
      const newMinuteMorning = minute;
      await getTime.update({ GioSang: parseInt(newHourMorning) });
      await getTime.update({ PhutSang: parseInt(newMinuteMorning) });
      if (checked == 1) {
        await getTime.update({ LevelSang: 1 });
      } else if (checked == 2) {
        await getTime.update({ LevelSang: 2 });
      } else if (checked == 3) {
        await getTime.update({ LevelSang: 3 });
      }
    } else if (hour > 10 && hour <= 14) {
      const newHourLunch = hour;
      const newMinuteLunch = minute;
      await getTime.update({ GioTrua: parseInt(newHourLunch) });
      await getTime.update({ PhutTrua: parseInt(newMinuteLunch) });
      if (checked == 1) {
        await getTime.update({ LevelTrua: 1 });
      } else if (checked == 2) {
        await getTime.update({ LevelTrua: 2 });
      } else if (checked == 3) {
        await getTime.update({ LevelTrua: 3 });
      }
    } else {
      const newHourEvening = hour;
      const newMinuteEvening = minute;
      await getTime.update({ GioChieu: parseInt(newHourEvening) });
      await getTime.update({ PhutChieu: parseInt(newMinuteEvening) });
      if (checked == 1) {
        await getTime.update({ LevelChieu: 1 });
      } else if (checked == 2) {
        await getTime.update({ LevelChieu: 2 });
      } else if (checked == 3) {
        await getTime.update({ LevelChieu: 3 });
      }
    }

    // const NutAn = await getTime.get("XacNhan");
    // await getTime.update({ XacNhan: 1 });
  };

  const SetReset = async () => {
    // const ResetButton = await getVoice.get("XacNhan");
    const ResetButton = 0;
    const ResetMucAn = 0;
    await getTime.update({ XacNhan: ResetButton });
    await getTime.update({ LevelSang: ResetMucAn });
    await getTime.update({ LevelTrua: ResetMucAn });
    await getTime.update({ LevelChieu: ResetMucAn });
    SetHour("");
  };

  const SetManual = async () => {
    if (checked == 1) {
      await getTime.update({ LevelThuCong: 1 });
    } else if (checked == 2) {
      await getTime.update({ LevelThuCong: 2 });
    } else if (checked == 3) {
      await getTime.update({ LevelThuCong: 3 });
    }
    await getTime.update({ XacNhan: 1 });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date().getDate(); //Current Date
      const month = new Date().getMonth() + 1; //Current Month
      const year = new Date().getFullYear(); //Current Year
      const hours = new Date().getHours(); //Current Hours
      const min = new Date().getMinutes(); //Current Minutes
      const sec = new Date().getSeconds(); //Current Seconds

      const formattedSec = sec < 10 ? "0" + sec : sec;
      const formattedHour = hours < 10 ? "0" + hours : hours;
      const formattedMin = min < 10 ? "0" + min : min;
      const formattedMonth = month < 10 ? "0" + month : month;

      const formattedDate =
        date +
        "/" +
        formattedMonth +
        "/" +
        year +
        " " +
        formattedHour +
        ":" +
        formattedMin +
        ":" +
        formattedSec;

      setCurrentDate(formattedDate);
    }, 1000); // chạy lại sau mỗi 1000ms = 1 giây

    return () => clearInterval(intervalId); // clear interval khi unmount component
  }, []);

  const SetAuto = async () => {
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds();
    console.log(hours, min, sec);

    if (
      (laykq[1] == hours && laykq[8] == min && sec == 0) ||
      (laykq[2] == hours && laykq[9] == min && sec == 0) ||
      (laykq[0] == hours && laykq[7] == min && sec == 0)
    ) {
      if (checked == 1) {
        await getTime.update({ LevelChieu: 1 });
      } else if (checked == 2) {
        await getTime.update({ LevelChieu: 2 });
      } else if (checked == 3) {
        await getTime.update({ LevelChieu: 3 });
      }
      await getTime.update({ XacNhan: 1 });
    }
  };

  const [laykq, setlaykq] = useState({});
  const fetchAPI = async () => {
    const food = ref(database, "/HenGio/");
    onValue(food, (snapshot) => {
      const values = snapshot.val();
      setlaykq(Object.values(values));
    });
  };
  SetAuto();
  useEffect(() => {
    fetchAPI();
  }, []);
  const formatlaykq7 = `${laykq[7]}` < 10 ? "0" + `${laykq[7]}` : `${laykq[7]}`;
  const formatlaykq8 = `${laykq[8]}` < 10 ? "0" + `${laykq[8]}` : `${laykq[8]}`;
  const formatlaykq9 = `${laykq[9]}` < 10 ? "0" + `${laykq[9]}` : `${laykq[9]}`;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>Thời Gian/ Mức Ăn Cho Mèo </Text>
          <TouchableOpacity>
            <Text style={styles.displayTimeEat}>
              Giờ Hiện Tại
              <Text style={styles.productInfoItemText}>{currentDate}</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handlePress(1);
            }}
          >
            <Text style={styles.displayTimeEat}>
              Giờ Sáng{" "}
              <Text style={styles.productInfoItemText}>
                {laykq[1]}:{formatlaykq8}
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handlePress(2);
            }}
          >
            <Text style={styles.displayTimeEat}>
              {" "}
              Giờ Trưa :
              <Text style={styles.productInfoItemText}>
                {laykq[2]}:{formatlaykq9}
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handlePress(3);
            }}
          >
            <Text style={styles.displayTimeEat}>
              {" "}
              Giờ Chiều :
              <Text style={styles.productInfoItemText}>
                {laykq[0]}:{formatlaykq7}{" "}
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Chỉnh Sửa Giờ: </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập Thời Gian"
              onChangeText={SetHour}
              value={writehour}
              keyboardType="numeric"
              returnKeyType="done"
              clearTextOnFocus
            />
          </View>
          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Small Food: </Text>
            <RadioButton
              value="1"
              status={checked === "1" ? "checked" : "unchecked"} //if the value of checked is Small, then select this button
              onPress={() => setChecked("1")} //when pressed, set the value of the checked Hook to 'Apple'
            />
          </View>

          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Meidum Food: </Text>
            <RadioButton
              value="2"
              status={checked === "2" ? "checked" : "unchecked"}
              onPress={() => setChecked("2")}
            />
          </View>

          <View style={styles.productInfoItem}>
            <Text style={styles.productInfoItemText}>Large Food: </Text>
            <RadioButton
              value="3"
              status={checked === "3" ? "checked" : "unchecked"}
              onPress={() => setChecked("3")}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => SetEdit()}
        >
          <MaterialIcons name="check" size={20} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.warning }]}
          onPress={() => SetReset()}
        >
          <MaterialIcons
            name="replay-circle-filled"
            size={20}
            color={colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.danger }]}
          onPress={() => SetManual()}
        >
          <MaterialIcons name="coronavirus" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 120,
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 10,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "white",
  },
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
    fontSize: 15,
    fontWeight: "500",
    color: colors.dark,
  },
});
