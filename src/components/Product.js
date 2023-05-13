import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

import { Colors } from "../assets/Colors";

export default function Product(props) {
  const { item, navigation } = props;

  const [isImageError, setIsImageError] = useState(false);

  const goToCart = () => {
    navigation.navigate("Cart", { item });
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToCart}>
      {isImageError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar la Imagen</Text>
        </View>
      ) : (
        <Image
          source={{
            uri: item.logo,
          }}
          style={styles.image}
          onError={handleImageError}
        />
      )}
      <View style={styles.separator}></View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>
        $
        {parseInt(item.price) >= 50
          ? item.price.toLocaleString().replace(",", ".")
          : 50}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 10,
    height: 230,
    width:
      Dimensions.get("window").width < 700
        ? (Dimensions.get("window").width - 30) / 2
        : (Dimensions.get("window").width - 30) / 5,
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: 100,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: Colors.danger,
  },
  separator: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    width: "107%",
    marginVertical: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    padding: 5,
  },
  price: {
    fontWeight: "bold",
  },
});
