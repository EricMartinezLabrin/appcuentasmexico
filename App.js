import { registerRootComponent } from "expo";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./src/Navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import NotificationApp from "./src/components/Notification";
registerRootComponent(App);

const linking = {
  prefixes: ["exp://192.168.100.10:19000/--/cmex/"],
  config: {
    screens: {
      MyAccount: "MyAccount",
      Login: "Login",
    },
  },
};

export default function App() {
  return (
    <AuthProvider>
      <RootSiblingParent>
        <NavigationContainer linking={linking}>
          <NotificationApp>
            <Navigation />
          </NotificationApp>
        </NavigationContainer>
      </RootSiblingParent>
    </AuthProvider>
  );
}
