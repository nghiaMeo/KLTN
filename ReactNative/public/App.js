import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./states/store";
export default function App() {
  console.reportErrorsAsExceptions = false;
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}





















// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
// import Header from "./component/Header";
// import Body from "./component/Body";
// import { Navbar } from "./component/Navbar";
// import { Setting } from "./component/Setting";
// import * as humidityServices from "./api-services/humidityService";

// export default function App() {
//   const [page, setPage] = useState("setting");
//   const [data, setData] = useState({});
//   const [time, setTime] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       // You can await here
//       const result = await humidityServices.get();
//       const time = await humidityServices.get("time/");
//       setData(result);
//       setTime(time);
//     }
//     fetchData();
//   },[data]);

//   const handlePage = (child) => {
//     setPage(child);
//   };
//   return (
//     <SafeAreaView>
//         <View style={styles.container}>
//           <Header />
//           <Body />
//         </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     backgroundColor: "white",
//     display: "flex",
//     flexDirection: "column",
//   },
// });
