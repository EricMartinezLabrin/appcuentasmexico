import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Gift() {
  const { auth } = useAuth();

  const copyCode = (code) => () => {
    Clipboard.setString(code);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.vexels.com/media/users/3/217997/isolated/lists/d439a251f09dee321022fbed116d0cfc-diseno-de-ilustracion-de-caja-de-regalo.png",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>
        No dejes que se te escapen cuentas gratis
      </Text>
      <Text style={styles.content}>
        Comparte tu codigo de referido con tus amigos y gana cuentas gratis.
      </Text>
      <Text style={styles.content}>
        Por cada amigo que se registre con tu codigo, ambos ganarán 7 Días
        gratis para cualquiera de tus cuentas.
      </Text>
      <Text style={styles.content}>Tu código de referido es:</Text>
      <View style={styles.copy}>
        <Text style={styles.code}>
          {auth?.user?.username?.substr(0, 4) + auth?.user?.id}
        </Text>
        <TouchableOpacity
          onPress={copyCode(
            auth?.user?.username?.substr(0, 4) + auth?.user?.id
          )}
        >
          <Icon name="copy" size={30} color="#900" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    fontSize: 15,
    width: "90%",
    marginBottom: 20,
    textAlign: "justify",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  code: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10,
  },
  copy: {
    flexDirection: "row",
  },
});
