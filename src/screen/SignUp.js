import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "../assets/Colors";
import Button from "../components/Button";
import { registerApi } from "../api/BackEnd";
import useAuth from "../hooks/useAuth";

const windowWidth = Dimensions.get("window").width;

export default function SignUp(props) {
  const { navigation } = props;
  const [showPassword, setShowPassword] = React.useState(true);
  const { logIn } = useAuth();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToMyAccount = () => {
    navigation.navigate("MyAccount");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      username: yup
        .string()
        .email("El email no es válido")
        .required("El email es requerido"),
      password: yup.string().required("El password es requerido"),
    }),
    onSubmit: (formData) => {
      registerApi(formData.username, formData.password, formData.username).then(
        (response) => {
          console.log(response);
          if (response?.status === 200) {
            Alert.alert(
              "Usuario creado",
              "El usuario se ha creado correctamente"
            );
            logIn(formData.username, formData.password).then((response) => {
              if (response?.status === 200) {
                goToMyAccount();
              }
            });
          }
        }
      );
    },
  });

  formik.errors.username && Alert.alert("Error", formik.errors.username);
  formik.errors.password && Alert.alert("Error", formik.errors.password);
  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View
        style={[
          styles.formContainer,
          windowWidth > 400 && { alignSelf: "center", width: 400 },
        ]}
      >
        <Text style={styles.label}>E-Mail:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu E-Mail"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            value={formik.values.username}
            onChangeText={(text) => formik.setFieldValue("username", text)}
            style={styles.input}
            keyboardType="email-address"
          />
          <Icon name="envelope" style={styles.icon} />
        </View>

        <Text style={styles.label}>Password:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu password"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            secureTextEntry={showPassword}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue("password", text)}
            style={styles.input}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={10} />
          </TouchableOpacity>

          <Icon name="lock" style={styles.icon} />
        </View>

        <Button
          title="Registrarse"
          style={styles.button}
          onPress={formik.handleSubmit}
        />
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.signUp}>¿Ya tienes cuenta? Inicia Sesión.</Text>
        </TouchableOpacity>
        {Platform.OS === "web" && formik.errors.username && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
        {Platform.OS === "web" && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    // justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
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
  signUp: {
    color: Colors.secondary,
    alignSelf: "center",
    marginTop: 10,
  },
});
