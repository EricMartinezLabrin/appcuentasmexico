import { Text, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Button(props) {
  const { style, title, onPress, icon } = props;

  const showIcon = !!icon ? <Icon name={icon} /> : null;

  const styleButton = { ...styles.button, ...style };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styleButton}>
        {showIcon} {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    width: "100%",
    borderRadius: 5,
  },
});
