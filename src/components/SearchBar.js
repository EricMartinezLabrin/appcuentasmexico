import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../assets/Colors";
import { getServiceByNameApi } from "../api/BackEnd";

export default function SearchBar(props) {
  const { setServices } = props;

  return (
    <View style={styles.searBarContainer}>
      <Icon name="search" size={15} color={Colors.secondary} />
      <TextInput
        style={styles.searchBar}
        autoFocus={true}
        placeholder="Buscar en Premium y Códigos"
        placeholderTextColor={Colors.secondary}
        placeholderStyle={{ fontSize: 15 }}
        onChange={(e) => {
          console.log(e.nativeEvent.text);
          if (e.nativeEvent.text.length > 0) {
            getServiceByNameApi(e.nativeEvent.text).then((response) => {
              setServices(response.detail);
            });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    width: "90%",
    height: 30,
  },
  searchBar: {
    width: "100%",
    left: 10,
  },
});
