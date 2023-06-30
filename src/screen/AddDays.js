import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { KeyboardAwareScrollView as ScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from "../components/Button";
import { Colors } from "../assets/Colors";
import useAuth from "../hooks/useAuth";
import { useFreeDaysApi } from "../api/BackEnd";

export default function AddfreeDays(props) {
  const { navigation } = props;
  const { freeDays, account_id, setRefreshing } = props.route.params;
  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: {
      freeDays: "",
      account_id: account_id,
      user: auth.user.username,
    },
    validationSchema: yup.object({
      freeDays: yup
        .number()
        .required("Ingresa la cantidad de días a agregar")
        .positive("Los días deben ser positivos")
        .max(freeDays, "No puedes agregar más días de los que tienes"),
    }),
    validateOnChange: false,
    onSubmit: (formData) => {
      useFreeDaysApi(
        formData.account_id,
        formData.freeDays,
        formData.user
      ).then((response) => {
        if (response.status === 200) {
          setRefreshing(true);
          navigation.goBack();
        } else {
          console.error(response.data);
        }
      });
    },
  });

  React.useEffect(() => {
    formik.errors.freeDays && Alert.alert("Error", formik.errors.freeDays);
  }, [formik.errors.freeDays]);

  React.useEffect(() => {
    formik.errors.account_id && Alert.alert("Error", formik.errors.account_id);
  }, [formik.errors.account_id]);

  React.useEffect(() => {
    formik.errors.user && Alert.alert("Error", formik.errors.user);
  }, [formik.errors.user]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Text style={styles.title}>
          ¿Cuántos dias quieres agregarle a esta cuenta?
        </Text>
        <Text style={styles.subtitle}>
          Puedes agregar {freeDays} días como maximo.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la cantidad de días a agregar"
          placeholderTextColor={Colors.secondary}
          keyboardType="numeric"
          value={formik.values.freeDays}
          onChangeText={formik.handleChange("freeDays")}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Aceptar"
            style={styles.acept}
            onPress={formik.handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    // padding: 10,
    flex: 1,
    width: "90%",
  },
  title: {
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    textAlign: "center",
    // right: 20,
    paddingStart: 20,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  subtitle: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  close: {
    backgroundColor: "red",
    width: "40%",
    maxWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  acept: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
});
