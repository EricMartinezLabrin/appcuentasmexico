import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Shop from "../screen/Shop";
import Cart from "../screen/Cart";
import FakeSearchBar from "../components/FakeSearchBar";
import SearchBar from "../components/SearchBar";
import Confirmation from "../screen/Confirmation";
import Search from "../screen/Search";
import Login from "../screen/Login";
import { Colors } from "../assets/Colors";

const Stack = createNativeStackNavigator();

export default function ShopNavigation(props) {
  const { navigation } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{
          headerTitle: () => <FakeSearchBar navigation={navigation} />,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.secondary,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "Carrito de Compras",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{
          title: "Confirmación de Compra",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={Login} options={{}} />
    </Stack.Navigator>
  );
}
