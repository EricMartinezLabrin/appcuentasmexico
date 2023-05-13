import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";

//Local
import { Colors } from "../assets/Colors";
import Button from "../components/Button";
import { APP_URL } from "../assets/Const";

const goToMyAccount = () => {
  Linking.openURL(APP_URL + "/MyAccount");
};

const goToShop = () => {
  Linking.openURL(APP_URL + "/Shop");
};

export default function Confirmation() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Muchas Gracias por tu compra</Text>
      <Text style={styles.subtitle}>
        Cuando tu pago sea aprobado recibirás una notificacion con tus claves de
        acceso. Tambien puedes consultarla en la sección "Mi Cuenta"
      </Text>
      <Button
        title="Ir a mi cuenta"
        style={styles.buttonAccount}
        onPress={goToMyAccount}
      />
      <Button
        title="Seguir comprando"
        style={styles.buttonShop}
        onPress={goToShop}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    alignSelf: "center",
    // color: Colors.secondary,
    margin: 30,
  },
  buttonAccount: {
    marginTop: 10,
    backgroundColor: Colors.secondary,
  },
  buttonShop: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
});
