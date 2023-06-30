import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as yup from "yup";
import { useFormik } from "formik";
import debounce from "lodash/debounce";

import { Colors } from "../assets/Colors";
import Button from "../components/Button";
import CountryPicker from "../components/CountryPicker";
import { registerUserApi } from "../api/BackEnd";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { logIn } = useAuth();
  const windowWidth = Dimensions.get("window").width;
  const [countryData, setCountry] = React.useState(null);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      country: "",
      phone: null,
      recommendation: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("El email debe ser válido")
        .required("El email es requerido"),
      password: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      passwordConfirmation: yup
        .string()
        .required("La confirmación de contraseña es requerida")
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
      phone: yup.number().required("El teléfono es requerido"),
      recommendation: yup.string().min(5, "El código es inválido"),
    }),
    validateOnChange: false,

    onSubmit: (formData) => {
      registerUserApi(
        formData.phone,
        formData.password,
        formData.email,
        formData.phone,
        formData.country,
        formData.recommendation.substr(4)
      ).then((response) => {
        setSubmitting(true);
        console.log(response);
        if (response.status === 400) {
          Alert.alert(
            "Usuario ya registrado",
            "Vuelve a intentarlo con un nuevo número de teléfono"
          );
        } else if (response.status === 200) {
          logIn(formData.phone, formData.password);
        }
        setSubmitting(false);
      });
    },
  });

  const handleSubmit = debounce(formik.handleSubmit, 500, {
    leading: true,
    trailing: false,
  });

  React.useEffect(() => {
    formik.setFieldValue("country", countryData);
  }, [countryData]);

  React.useEffect(() => {
    formik.errors.country &&
      Alert.alert(formik.errors.country, "Vuelve a intentarlo");
  }, [formik.errors.country]);
  console.log(formik.errors);

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View
        style={[
          styles.formContainer,
          windowWidth > 400 && { alignSelf: "center", width: 400 },
        ]}
      >
        <Text style={styles.label}>Teléfono:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu teléfono"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            fontSize={10}
            keyboardType="phone-pad"
            value={formik.values.phone}
            onChangeText={formik.handleChange("phone")}
            onSubmitEditing={() => {
              emailInput.focus();
            }}
            ref={(input) => {
              phoneInput = input;
            }}
          />
          <Icon name="phone" style={styles.icon} />
        </View>
        {formik.errors.phone && (
          <Text style={styles.error}>{formik.errors.phone}</Text>
        )}
        <Text style={styles.label}>Email:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu email"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            fontSize={10}
            keyboardType="email-address"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onSubmitEditing={() => {
              passwordInput.focus();
            }}
            ref={(input) => {
              emailInput = input;
            }}
          />
          <Icon name="envelope" style={styles.icon} />
        </View>
        {formik.errors.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}
        <View style={styles.similarContainer}>
          <View style={styles.spaceInput}>
            <Text style={styles.label}>Password:</Text>
            <View style={styles.halfInputContainer}>
              <TextInput
                placeholder="Escribe tu password"
                autoCapitalize="none"
                placeholderTextColor={"grey"}
                fontSize={10}
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onSubmitEditing={() => {
                  passwordConfirmationInput.focus();
                }}
                ref={(input) => {
                  passwordInput = input;
                }}
              />
              <Icon name="lock" style={styles.icon} />
            </View>
            {formik.errors.password && (
              <Text style={styles.error}>{formik.errors.password}</Text>
            )}
          </View>
          <View style={styles.spaceInput}>
            <Text style={styles.label}>Repite tu password:</Text>
            <View style={styles.halfInputContainer}>
              <TextInput
                placeholder="Repite tu password"
                autoCapitalize="none"
                placeholderTextColor={"grey"}
                fontSize={10}
                secureTextEntry={true}
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange("passwordConfirmation")}
                onSubmitEditing={() => {
                  referenceInput.focus();
                }}
                ref={(input) => {
                  passwordConfirmationInput = input;
                }}
              />
              <Icon name="lock" style={styles.icon} />
            </View>
            {formik.errors.passwordConfirmation && (
              <Text style={styles.error}>
                {formik.errors.passwordConfirmation}
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.label}>País:</Text>

        <CountryPicker setCountry={setCountry} />
        <Text style={styles.label}>
          ¿Tienes código promocional? ingresalo aqui (opcional):
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe el teléfono de quien te recomendó"
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            fontSize={10}
            value={formik.values.recommendation}
            onChangeText={formik.handleChange("recommendation")}
            onSubmitEditing={() => {
              handleSubmit();
            }}
            ref={(input) => {
              referenceInput = input;
            }}
          />
          <Icon name="user" style={styles.icon} />
        </View>
        <Button
          style={styles.button}
          title="Registrarse"
          onPress={handleSubmit}
          // disabled={isSubmitting}
        />
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
  halfInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
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
    fontSize: 8,
    bottom: 10,
  },
  register: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 10,
    paddingVertical: 5,
    textAlign: "center",
  },
  similarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  spaceInput: {
    width: "48%",
  },
});
