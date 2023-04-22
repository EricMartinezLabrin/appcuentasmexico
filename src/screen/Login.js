import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as yup from "yup";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";
import { Colors } from "../assets/Colors";
import useAuth from "../hooks/useAuth";

const windowWidth = Dimensions.get("window").width;

export default function Login(props) {
  const { navigation } = props;
  const { logIn, auth } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    if (auth) {
      goToMyAccount();
    } else {
      const checkIfLoggedIn = async () => {
        const authStorage = await AsyncStorage.getItem("auth");
        if (authStorage) {
          const { username, password } = JSON.parse(authStorage);
          logIn(username, password).then((response) => {
            if (response?.status === 200) {
              goToMyAccount();
            }
          });
        }
      };
      checkIfLoggedIn();
    }
  }, [auth]);

  const goToMyAccount = () => {
    navigation.navigate("MyAccount");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      username: yup.string().required("El username es requerido"),
      password: yup
        .string()
        .required("El password es requerido")
        .min(6, "El password debe tener 6 caracteres"),
    }),
    onSubmit: (formData, { resetForm }) => {
      logIn(formData.username, formData.password).then((response) => {
        resetForm();
        if (response?.status === 200) {
          goToMyAccount();
        }
      });
    },
  });

  React.useEffect(() => {
    if (formik.errors.username && Platform.OS !== "web") {
      Toast.show(formik.errors.username, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }, [formik.errors.username]);

  React.useEffect(() => {
    if (formik.errors.password && Platform.OS !== "web") {
      Toast.show(formik.errors.password, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }, [formik.errors.password]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View
        style={[
          styles.formContainer,
          windowWidth > 400 && { alignSelf: "center", width: 400 },
        ]}
      >
        <Text style={styles.label}>Username:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu username"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            value={formik.values.username}
            onChangeText={(text) => formik.setFieldValue("username", text)}
            style={styles.input}
          />
          <Icon name="user" style={styles.icon} />
        </View>

        <Text style={styles.label}>Password:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu password"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            secureTextEntry={showPassword ? true : false}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue("password", text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={10} />
          </TouchableOpacity>

          <Icon name="lock" style={styles.icon} />
        </View>

        <Button
          title="Login"
          style={styles.button}
          onPress={formik.handleSubmit}
        />
        {Platform.OS === "web" && formik.errors.username && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
        {Platform.OS === "web" && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  formContainer: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    color: "#fff",
    width: "100%",
  },
  input: {
    fontSize: 12,
    width: "90%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  icon: {
    fontWeight: "bold",
    fontSize: 10,
    alignSelf: "center",
  },
  error: {
    color: Colors.danger,
    fontWeight: "bold",
    fontSize: 10,
    paddingVertical: 5,
  },
});
