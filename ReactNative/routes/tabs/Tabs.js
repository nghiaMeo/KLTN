import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../screens/user/HomeScreen";
import { colors } from "../../constants";
import UserProfileScreen from "../../screens/profile/UserProfileScreen";
import HomeIconActive from "../../assets/icons/bar_home_icon_active.png";
import HomeIcon from "../../assets/icons/bar_home_icon.png";
import userIcon from "../../assets/icons/profileicon.png";
import userIconActive from "../../assets/icons/profileiconactive.png";
import CategoriesScreen from "../../screens/user/CategoriesScreen";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,

        tabBarIcon: ({ focused }) => {
          let routename = route.name;
          if (routename == "home") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Image
                    source={HomeIconActive}
                    style={StyleSheet.tabIconStyle}
                  />
                ) : (
                  <Image source={HomeIcon} style={StyleSheet.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "categories") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Ionicons
                    name="ios-apps-sharp"
                    size={29}
                    color={colors.primary}
                  />
                ) : (
                  <Ionicons
                    name="ios-apps-sharp"
                    size={29}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "user") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Image
                    source={userIconActive}
                    style={StyleSheet.tabIconStyle}
                  />
                ) : (
                  <Image source={userIcon} style={StyleSheet.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          }
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        //initialParams={{ user: user }}
        tabBarOptions={{
          style: {
            position: "absolute",
          },
        }}
      />
      <Tab.Screen
        name="user"
        component={UserProfileScreen}
        //initialParams={{ user: user }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 10,
    height: 10,
  },
});
