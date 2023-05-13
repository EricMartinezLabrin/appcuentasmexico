import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../assets/Colors";

export default function SearchBar(props) {
  const { navigation } = props;
  const goToSearch = () => {
    navigation.navigate("Search");
  };
  return (
    <TouchableOpacity style={styles.searBarContainer} onPress={goToSearch}>
      <Icon name="search" size={15} color={Colors.secondary} />
      <Text style={styles.fakePlaceholder}>Buscar en Premium y Códigos</Text>
      <View style={styles.searchBar} />
    </TouchableOpacity>
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
  },
  fakePlaceholder: {
    color: Colors.secondary,
    left: 10,
  },
});
