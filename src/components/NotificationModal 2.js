import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import Button from "./Button";

export default function NotificationModal(props) {
  const { visible, title, body, acept } = props;

  const [visibleState, setVisibleState] = React.useState(visible);

  React.useEffect(() => {
    setVisibleState(visible);
  }, [visible]);

  return (
    <Modal visible={visibleState}>
      <View style={styles.modalBody}>
        <View style={styles.modal}>
          <View style={styles.icon}>
            <Icon
              name="times"
              size={20}
              onPress={() => setVisibleState(false)}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text>{body}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Cerrar"
                style={styles.close}
                onPress={() => setVisibleState(false)}
              />
              <Button title="Aceptar" style={styles.acept} onPress={acept} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBody: {
    backgroundColor: "rgba(1, 1, 1, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    width: "80%",
    height: "25%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  content: {
    marginTop: 20,
    height: "100%",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "120%",
    right: 20,
    paddingStart: 20,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    left: 80,
    top: 40,
  },
  close: {
    backgroundColor: "red",
    width: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  acept: {
    backgroundColor: "green",
    width: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
