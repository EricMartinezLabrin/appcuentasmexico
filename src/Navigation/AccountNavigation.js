import { View, Text, Linking } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import MyAccount from "../screen/MyAccount";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import AddDays from "../screen/AddDays";
import ChangePassword from "../screen/ChangePassword";
import Register from "../screen/Register";
import { Colors } from "../assets/Colors";
import useAuth from "../hooks/useAuth";
import Gift from "../screen/Gift";
import { APP_URL } from "../assets/Const";

const Stack = createNativeStackNavigator();

export default function ShopNavigation() {
  const { auth, logOut } = useAuth();

  const handleWhatsAppPress = () => {
    const whatsappNumber = "5218335355863";
    const whatsappText = `Hola!, hice una compra por la aplicación y necesito ayuda, mi username es ${auth.user.username}`;

    Linking.openURL(
      `whatsapp://send?phone=${whatsappNumber}&text=${whatsappText}`
    );
  };

  const goToGift = () => {
    Linking.openURL(APP_URL + "Gift");
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
          headerLeft: () => <Text></Text>,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="gift"
                size={15}
                color="white"
                onPress={goToGift}
                style={{ marginRight: 20 }}
              />
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

      <Stack.Screen
        name="AddDays"
        component={AddDays}
        options={{
          title: "Agregar días",
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
        name="Register"
        component={Register}
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
        name="Gift"
        component={Gift}
        options={{
          title: "Regalar",
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
