import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

//Local
import Product from "../components/Product";
import { getServicesApi } from "../api/BackEnd";

export default function Shop(props) {
  const { navigation } = props;
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    getServicesApi().then((response) => {
      setServices(response.detail);
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.productContainer}>
        {services.length > 0 &&
          services.map(
            (service, index) => (
              (<Text>{service}</Text>),
              (<Product item={service} navigation={navigation} key={index} />)
            )
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  productContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
