import { Picker } from "@react-native-picker/picker";
import React from "react";

import { getCountriesApi } from "../api/BackEnd";
import { Colors } from "../assets/Colors";

export default function CountryPicker(props) {
  const { setCountry } = props;
  const [selectedValue, setSelectedValue] =
    React.useState("Selecciona un País");

  const [countries, setCountries] = React.useState([]);
  React.useEffect(() => {
    getCountriesApi().then((response) => {
      data = ["Mexico", "Chile", ...response?.data?.detail];
      setCountries(data);
    });
  }, []);

  const dataSelect = (data) => {
    setSelectedValue(data);
    setCountry(data);
  };
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => dataSelect(itemValue)}
      style={{ borderWidth: 1, borderRadius: 5, borderColor: Colors.secondary }}
    >
      {countries.map((item, index) => (
        <Picker.Item
          label={item}
          value={item}
          key={index}
          style={{ fontSize: 10 }}
        />
      ))}
    </Picker>
  );
}
