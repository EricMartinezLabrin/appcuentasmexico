import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  Clipboard,
  Dimensions,
  Linking,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";

import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { Colors } from "../assets/Colors";
import { getActiveAccountByUserApi } from "../api/BackEnd";
import { BACKEND_URL } from "../assets/Const";
import { useIsFocused } from "@react-navigation/native";
import { getFreeDaysApi } from "../api/BackEnd";

export default function MyAccount(props) {
  const { navigation } = props;
  const { auth, loginRequired } = useAuth();
  const [accounts, setAccounts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [freeDays, setFreeDays] = React.useState(0);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      const getAccounts = async () => {
        const response = await getActiveAccountByUserApi(auth);
        response && setAccounts(response.detail);
      };
      getAccounts();
    }
  }, [isFocused]);

  loginRequired(navigation);

  const goToAddDays = (account_id) => {
    navigation.navigate("AddDays", { account_id, freeDays, setRefreshing });
  };

  const copy = (text) => {
    Clipboard.setString(text);
    alert("Copiado!");
  };

  const isWideScreen = Dimensions.get("window").width > 768;

  React.useEffect(() => {
    getFreeDaysApi(auth.user.username).then((response) => {
      setFreeDays(response.detail);
    });
  }, []);
  if (refreshing) {
    getFreeDaysApi(auth.user.username).then((response) => {
      setFreeDays(response.detail);
      setRefreshing(false);
    });
  }

  const handleWhatsAppPress = () => {
    const whatsappNumber = "5218335355863";
    const whatsappText =
      "Hola, les hablo desde la app de Cuentas México, Quiero comprar una cuenta.";

    Linking.openURL(
      `whatsapp://send?phone=${whatsappNumber}&text=${whatsappText}`
    );
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            const response = await getActiveAccountByUserApi(auth);
            const result = await response.json();
            setAccounts(result.detail);
            const freeDaysResponse = await getFreeDaysApi(auth.user.username);
            setFreeDays(freeDaysResponse.detail);
            setRefreshing(false);
          }}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Bienvenido
          {auth?.user?.first_name
            ? ` ${auth?.user?.first_name} ${auth?.user?.last_name}`
            : `  ${auth?.user?.username}`}
        </Text>
        {freeDays > 0 && (
          <Text style={styles.freeDays}>
            Felicidades, tienes {freeDays} días gratis, agregalos a cualquier
            suscripción activa.
          </Text>
        )}
        {accounts.length > 0 ? (
          accounts?.map((item, index) => (
            <View key={index} style={styles.accountContainerParent}>
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
                    <Text>
                      Cuenta: {item.account__account_name__description}
                    </Text>
                  )}
                </View>
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
                    <Text style={styles.elements}>Fecha de expiración: </Text>
                    <Text>
                      {moment(item.expiration_date).format("DD/MM/YYYY")}
                    </Text>
                  </View>

                  {freeDays > 0 && (
                    <View style={styles.dataEach}>
                      <Button
                        title="Agregar Días Gratis +"
                        style={styles.freeDaysButton}
                        onPress={() => goToAddDays(item.account__id)}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.accountContainerParent}>
            <View style={[styles.accountContainer]}>
              <View style={styles.accountContainerLogo}>
                <Text style={styles.noAccount}>No tienes cuentas activas</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 20,
  },
  button: {
    left: 100,
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
    fontSize: 12,
  },
  accountContainerParent: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  freeDays: {
    color: Colors.primary,
    marginBottom: 10,
    fontWeight: "bold",
  },
  freeDaysButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderRadius: 5,
  },
});
