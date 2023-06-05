import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import * as humidityService from "../api-services/humidityService";

export function Setting({ data, time }) {
  const [pump, onPumpTime] = useState(null);
  const [wait, onWaitTime] = useState(null);
  const [hour1, setHour1] = useState(null);
  const [hour2, setHour2] = useState(null);
  const [mi1, setMi1] = useState(null);
  const [mi2, setMi2] = useState(null);

  const handlePump = async () => {
    await humidityService.update({ humidtop: parseInt(pump) });
  };
  const handleWait = async () => {
    await humidityService.update({ humidbot: parseInt(wait) });
  };
  const handleTime1 = async () => {
    var hourplus = 0;
    if (mi1 != null) {
      var temp = mi1;
      if (mi1 >= 60) {
        temp = mi1 % 60;
        hourplus = mi1 / 60;
      }
      await humidityService.update({ minute1: parseInt(temp) }, "time/");
    }
    if (hour1 != null) {
      var temp = hour1;
      if (hour1 >= 24) {
        temp = hour1 % 24;
      }
      if (hourplus >= 1) {
        hourplus = Math.floor(hourplus);
        temp = parseInt(temp) + hourplus;
      }
      await humidityService.update({ hour1: parseInt(temp) }, "time/");
    }
  };
  const handleTime2 = async () => {
    var hourplus = 0;
    if (mi2 != null) {
      var temp = mi2;
      if (mi2 >= 60) {
        temp = mi2 % 60;
        hourplus = mi2 / 60;
      }
      await humidityService.update({ minute2: parseInt(temp) }, "time/");
    }
    if (hour2 != null) {
      var temp = hour2;
      if (hour2 >= 24) {
        temp = hour2 % 24;
      }
      if (hourplus >= 1) {
        hourplus = Math.floor(hourplus);
        temp = parseInt(temp) + hourplus;
      }
      await humidityService.update({ hour2: parseInt(temp) }, "time/");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.header} numberOfLines={1}>
          Settings
        </Text>
      </View>
      <View>
        <Text style={styles.text}>Maximum humidity: {data.humidtop} g/m³</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter pumptime"
          onChangeText={onPumpTime}
          value={pump}
          keyboardType="numeric"
          returnKeyType="done"
          clearTextOnFocus
        />
        <View style={styles.button}>
          <Text
            style={{ fontSize: 30, color: "white" }}
            onPress={() => handlePump()}
          >
            UPDATE
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Minimum humidity: {data.humidbot} g/m³</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={{ ...styles.input }}
          placeholder="Enter waittime   "
          keyboardType="numeric"
          onChangeText={onWaitTime}
          value={wait}
          returnKeyType="done"
          clearTextOnFocus
        />
        <View style={{ ...styles.button }}>
          <Text
            style={{ fontSize: 30, color: "white" }}
            onPress={() => handleWait()}
          >
            UPDATE
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>
          Time of 1st watering: {time.hour1} : {time.minute1}
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={{ ...styles.input, width: 90 }}
          placeholder="Hour"
          keyboardType="numeric"
          onChangeText={setHour1}
          value={hour1}
          returnKeyType="done"
          clearTextOnFocus
        />
        <TextInput
          style={{ ...styles.input, width: 90 }}
          placeholder="Minutes"
          keyboardType="numeric"
          onChangeText={setMi1}
          value={mi1}
          returnKeyType="done"
          clearTextOnFocus
        />
        <View style={{ ...styles.button }}>
          <Text
            style={{ fontSize: 30, color: "white" }}
            onPress={() => handleTime1()}
          >
            UPDATE
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>
          Time of 2nd watering: {time.hour2} : {time.minute2}
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={{ ...styles.input, width: 90 }}
          placeholder="Hour"
          keyboardType="numeric"
          onChangeText={setHour2}
          value={hour2}
          returnKeyType="done"
          clearTextOnFocus
        />
        <TextInput
          style={{ ...styles.input, width: 90 }}
          placeholder="Minutes"
          keyboardType="numeric"
          onChangeText={setMi2}
          value={mi2}
          returnKeyType="done"
          clearTextOnFocus
        />
        <View style={{ ...styles.button }}>
          <Text
            style={{ fontSize: 30, color: "white" }}
            onPress={() => handleTime2()}
          >
            UPDATE
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 48,
  },
  containerHeader: {
    alignItems: "center",
    margin: 50,
  },
  header: {
    fontSize: 60,
    marginTop: 10,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    // marginTop: 30,
    marginLeft: 20,
  },
  input: {
    height: 50,
    width: 165,
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    margin: 20,
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#108248",
    width: "40%",
    height: 50,
  },
});
