import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import { Colors } from "../assets/Colors";

export default function Search(props) {
  const { navigation } = props;
  const [services, setServices] = React.useState([]);
  const goToCart = (item) => {
    navigation.navigate("Cart", { item });
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar setServices={setServices} />
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => goToCart(item)}
          >
            <Image source={{ uri: item.logo }} style={styles.image} />
            <View>
              <Text style={styles.text}>{item.description}</Text>
              <Text style={styles.description}>{item.info}</Text>
              <Text style={styles.price}>
                $
                {parseInt(item.price) >= 500
                  ? item.price.toLocaleString().replace(",", ".")
                  : 500}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    paddingTop: 35,
  },

  itemContainer: {
    padding: 10,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    marginLeft: 10,
  },
  price: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.primary,
  },
});
