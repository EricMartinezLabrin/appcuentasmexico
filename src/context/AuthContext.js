import React from "react";
import { loginApi } from "../api/BackEnd";
import { Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_URL } from "../assets/Const";

export const AuthContext = React.createContext({
  auth: undefined,
  logIn: async () => {},
  loginRequired: () => {},
  logOut: async () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = React.useState(null);

  const logIn = async (username, password) => {
    try {
      const result = await loginApi(username, password);
      if (result?.status == 200) {
        const data = await result.json();
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify({ username: username, password: password })
        );
        data["user"]["password"] = password;
        setAuth(data);

        if (password === "cuentasmexico") {
          Alert.alert(
            "Aun no has cambiado tu contraseña!",
            "Evita que roben tus claves. Por favor cambia tu contraseña para continuar"
          );
          Linking.openURL(APP_URL + "/ChangePassword");
        }
        return result;
      } else {
        Alert.alert("Error", "Usuario o contraseña incorrecta");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginRequired = (navigation) => {
    if (!auth) {
      navigation.navigate("Login");
    }
  };

  const logOut = async () => {
    Alert.alert("Sesión cerrada", "Vuelve pronto");
    setAuth(null);
    await AsyncStorage.removeItem("auth");
  };

  const valueContext = {
    auth,
    logIn,
    loginRequired,
    logOut,
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
