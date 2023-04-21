import { registerRootComponent } from "expo";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./src/Navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
registerRootComponent(App);

export default function App() {
  return (
    <AuthProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </RootSiblingParent>
    </AuthProvider>
  );
}
