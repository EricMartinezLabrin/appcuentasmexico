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
import { changePassword, registerApi } from "../api/BackEnd";
import useAuth from "../hooks/useAuth";

const windowWidth = Dimensions.get("window").width;

export default function SignUp(props) {
  const { navigation } = props;
  const [showPassword, setShowPassword] = React.useState(true);
  const { auth, logIn, logOut, loginRequired } = useAuth();
  loginRequired(navigation);
  const goToMyAccount = () => {
    navigation.navigate("MyAccount");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      currentPassword: yup.string().required("El password es requerido"),
      newPassword: yup.string().required("El password es requerido"),
      confirmPassword: yup.string().required("El password es requerido"),
    }),
    onSubmit: (formData) => {
      changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword,
        auth.user.username
      ).then((response) => {
        console.log(response);
        Alert.alert(
          "Contraseña Cambiada Correctamente",
          "Inicia sesión con tu nueva contraseña para continuar"
        );
        logOut();
      });
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
        <Text style={styles.label}>Password Actual:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu password"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            secureTextEntry={showPassword}
            value={formik.values.currentPassword}
            onChangeText={(text) =>
              formik.setFieldValue("currentPassword", text)
            }
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={10} />
          </TouchableOpacity>

          <Icon name="lock" style={styles.icon} />
        </View>
        <Text style={styles.label}>Password Actual:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu nuevo password"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            secureTextEntry={showPassword}
            value={formik.values.newPassword}
            onChangeText={(text) => formik.setFieldValue("newPassword", text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={10} />
          </TouchableOpacity>

          <Icon name="lock" style={styles.icon} />
        </View>
        <Text style={styles.label}>Password Actual:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirma tu nuevo password"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            secureTextEntry={showPassword}
            value={formik.values.confirmPassword}
            onChangeText={(text) =>
              formik.setFieldValue("confirmPassword", text)
            }
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={10} />
          </TouchableOpacity>

          <Icon name="lock" style={styles.icon} />
        </View>
        <Button
          title="Cambiar Contraseña"
          style={styles.button}
          onPress={formik.handleSubmit}
        />
        <TouchableOpacity onPress={goToMyAccount}>
          <Text style={styles.signUp}>
            ¿No Quieres Cambiarlo? Volver a mi Cuenta.
          </Text>
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
