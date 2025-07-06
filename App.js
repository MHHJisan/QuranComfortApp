// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import DuasScreen from "./screens/DuaScreen";
import AboutScreen from "./screens/AboutScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Quran") {
                iconName = "book";
              } else if (route.name === "Duas") {
                iconName = "hands-pray";
              } else if (route.name === "About") {
                iconName = "information";
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: "#2e7d32",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              paddingBottom: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
            },
          })}
        >
          <Tab.Screen
            name="Quran"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Quran Verses",
            }}
          />
          <Tab.Screen
            name="Duas"
            component={DuasScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Duas",
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarLabel: "About",
              headerStyle: {
                backgroundColor: "#2e7d32",
              },
              headerTintColor: "#fff",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
