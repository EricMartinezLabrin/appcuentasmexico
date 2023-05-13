import { View, Text, Linking } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import MyAccount from "../screen/MyAccount";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import ChangePassword from "../screen/ChangePassword";
import { Colors } from "../assets/Colors";
import useAuth from "../hooks/useAuth";
import Icon from "react-native-vector-icons/FontAwesome5";

const Stack = createNativeStackNavigator();

export default function ShopNavigation() {
  const { auth, logOut } = useAuth();

  const handleWhatsAppPress = () => {
    const whatsappNumber = "5218335355863";
    const whatsappText = `Hola!, hice una compra por la aplicación y necesito ayuda, mi username es ${auth.username}`;

    Linking.openURL(
      `whatsapp://send?phone=${whatsappNumber}&text=${whatsappText}`
    );
  };

  return (
    <Stack.Navigator initialRouteName={auth ? "MyAccount" : "Login"}>
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: "Mi Cuenta",
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="question"
                size={15}
                color="white"
                onPress={handleWhatsAppPress}
                style={{ marginRight: 20 }}
              />
              <Icon
                name="sign-out-alt"
                size={20}
                color="white"
                onPress={logOut}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Registro",
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
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Cambiar contraseña",
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Stack.Navigator>
  );
}
