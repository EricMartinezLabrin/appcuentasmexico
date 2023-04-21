import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  Clipboard,
  Dimensions,
} from "react-native";
import React from "react";
import moment from "moment";
// import Clipboard from "@react-native-clipboard/clipboard";

import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { Colors } from "../assets/Colors";
import { getActiveAccountByUserApi } from "../api/BackEnd";
import { BACKEND_URL } from "../assets/Const";

export default function MyAccount(props) {
  const { navigation } = props;
  const { auth, loginRequired, logOut } = useAuth();
  const [accounts, setAccounts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    try {
      (async () => {
        const response = await getActiveAccountByUserApi(auth);
        const result = await response.json();
        setAccounts(result.detail);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  loginRequired(navigation);

  const copy = (text) => {
    Clipboard.setString(text);
    alert("Copiado!");
  };

  const isWideScreen = Dimensions.get("window").width > 768;

  return (
    <View
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            const response = await getActiveAccountByUserApi(auth);
            const result = await response.json();
            setAccounts(result.detail);
            setRefreshing(false);
          }}
        />
      }
    >
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>
        Bienvenido {auth?.user?.first_name} {auth?.user?.last_name}
      </Text>
      <Text style={styles.subTitle}>Cuentas Activas</Text>

      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <View style={styles.accountContainerParent}>
            <View
              style={[
                styles.accountContainer,
                isWideScreen && styles.accountContainerWide,
              ]}
            >
              <View style={styles.accountContainerLogo}>
                {item.account__account_name__logo ? (
                  <Image
                    source={{
                      uri: `${BACKEND_URL}/media/${item.account__account_name__logo}`,
                    }}
                    style={styles.logoAcc}
                  />
                ) : (
                  <Text>Cuenta: {item.account__account_name__description}</Text>
                )}
                <View style={styles.data}>
                  <View style={styles.dataEach}>
                    <Text style={styles.elements}>E-mail: </Text>
                    <Text onPress={() => copy(item.account__email)}>
                      {item.account__email}
                    </Text>
                  </View>
                  <View style={styles.dataEach}>
                    <Text style={styles.elements}>Password: </Text>
                    <Text onPress={() => copy(item.account__password)}>
                      {item.account__password}
                    </Text>
                  </View>
                  <View style={styles.dataEach}>
                    <Text style={styles.elements}>Pin: </Text>
                    <Text> {item.account__pin}</Text>
                  </View>
                  <View style={styles.dataEach}>
                    <Text style={styles.elements}>Perfil: </Text>
                    <Text>{item.account__profile}</Text>
                  </View>
                  <View style={styles.dataEach}>
                    <Text style={styles.elements}>Vencimiento: </Text>
                    <Text>
                      {moment(item.expiration_date).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={async () => {
          setRefreshing(true);
          const response = await getActiveAccountByUserApi(auth);
          const result = await response.json();
          setAccounts(result.detail);
          setRefreshing(false);
        }}
        refreshing={refreshing}
        contentContainerStyle={
          isWideScreen
            ? {
                flexWrap: "wrap",
                flexDirection: "row",
              }
            : {}
        }
      />

      <Button style={styles.button} title="Cerrar Sesion" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  logoAcc: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  accountContainer: {
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10,
    alignSelf: "stretch",
    width: "100%",
  },
  accountContainerLogo: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto", // Agregar para ajustar al contenido
  },
  data: {},
  dataEach: {
    flexDirection: "row",
  },
  elements: {
    fontWeight: "bold",
  },
  accountContainerParent: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
});