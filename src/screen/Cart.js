import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import * as Crypto from "expo-crypto";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStripe } from "@stripe/stripe-react-native";

//LOcal
import { FlowPayment, GetFlowUrlApi } from "../api/Flow";
import { Colors } from "../assets/Colors";
import { APP_URL, BACKEND_URL } from "../assets/Const";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { getKeysApi, saleApi } from "../api/BackEnd";

export default function Cart(props) {
  const { navigation } = props;
  const item = props.route.params.item;
  const startPrice = item.price >= 50 ? item.price : 50;
  const [price, setPrice] = React.useState(startPrice);
  const [months, setMonths] = React.useState(1);
  const [disabled, setDisabled] = React.useState(false);
  const [keys, setKeys] = React.useState(null);
  const UUID = Crypto.randomUUID();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { auth, logIn } = useAuth();

  React.useEffect(() => {
    if (!auth) {
      const checkIfLoggedIn = async () => {
        const authStorage = await AsyncStorage.getItem("auth");
        if (authStorage) {
          const { username, password } = JSON.parse(authStorage);
          logIn(username, password);
        }
      };
      checkIfLoggedIn();
    }

    getKeysApi().then((response) => {
      setKeys(response.data);
    });
  }, []);

  React.useEffect(() => {
    if (months < 1) {
      setDisabled(true);
      Alert.alert(
        "No puedes comprar 0 Meses",
        "Debes seleccionar al menos 1 mes"
      );
    } else {
      setDisabled(false);
    }
  }, [months]);

  const goToStripe = async () => {
    //1.- Create a payment intent
    const response = await fetch(BACKEND_URL + "/api/stripe/create_payment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "MXN",
        amount: Math.round(price * 100),
      }),
    });
    if (response.error) {
      Alert.alert("something went wrong");
      return;
    }
    const { clientSecret } = await response.json();

    // 2.- Initialize the payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Cuentas México",
      paymentIntentClientSecret: clientSecret,
      applePay: {
        merchantCountryCode: "MX",
      },
      style: "alwaysDark",
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert(
        `Error code: ${initResponse.error.code}`,
        initResponse.error.message
      );
      return;
    }
    //3.- Present the payment sheet from stripe
    const paymentResponse = await presentPaymentSheet();
    if (paymentResponse.error) {
      console.log(paymentResponse.error);
      setDisabled(false);
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }
    // 4.- If payment ok, confirm the payment
    saleApi(auth, item.id, "Stripe TC", UUID, price, months).then(
      (response) => {
        data = response.json();
        console.log(data);
        if (response.status == 200) {
          navigation.navigate("Confirmation", { item: item });
        } else {
          Alert.alert(
            "Error al realizar la compra",
            "Contacta a soporte para más información"
          );
        }
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      time: 1,
    },
    validationSchema: Yup.object({
      time: Yup.number().required(true).min(1),
    }),
    validateOnChange: true,
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.cartContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.logo }} style={styles.image} />
        </View>
        <View style={styles.separator}></View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.label}>Duración en Meses:</Text>
              <TextInput
                style={styles.time}
                value={formik.values.time.toString()}
                onChangeText={(text) => {
                  formik.setFieldValue("time", text),
                    setMonths(text),
                    text * item.price >= 50
                      ? setPrice(text * item.price)
                      : setPrice(50);
                }}
                placeholder="Cantidad"
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.price}>
              ${price >= 50 ? price.toLocaleString().replace(",", ".") : 50}
            </Text>
          </View>
        </View>
      </View>
      {auth ? (
        <View style={styles.paymentContainer}>
          {/* {keys?.flow_show && (
            <Button
              title="Comprar con RedCompra"
              onPress={startPaymentFlow}
              style={styles.buttonFlow}
              disabled={disabled}
            />
          )} */}

          <View>
            <Button
              title="Comprar con Tarjeta de Credito"
              onPress={goToStripe}
              style={styles.buttonCredit}
              disabled={disabled}
            />
          </View>
        </View>
      ) : (
        <Button
          title="Inicia Sesión para comprar"
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonCredit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cartContainer: {
    borderRadius: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,

    height: "70%",
  },
  imageContainer: {
    height: "30%",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
  separator: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    width: "107%",
    marginVertical: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  description: {
    fontSize: 15,
    alignSelf: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    marginTop: 10,
  },
  time: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    width: 140,
    textAlign: "center",
  },
  content: {
    margin: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary,
    alignSelf: "flex-end",
    marginLeft: 10,
    bottom: 15,
  },
  buttonFlow: {
    marginVertical: 5,
    backgroundColor: "lightblue",
  },
  buttonCredit: {
    marginVertical: 5,
    backgroundColor: "lightgreen",
  },
});
