import React from "react";
import { registerRootComponent } from "expo";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";

import Navigation from "./src/Navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import NotificationApp from "./src/components/Notification";
import { APP_URL } from "./src/assets/Const";
import { getKeysApi } from "./src/api/BackEnd";
registerRootComponent(App);

const linking = {
  prefixes: [APP_URL],
  config: {
    screens: {
      AccountNavigation: {
        screens: {
          MyAccount: "MyAccount",
          Login: "Login",
          SignUp: "SignUp",
          ChangePassword: "ChangePassword",
        },
      },
      ShopNavigation: {
        screens: {
          Confirmation: "Confirmation",
          Cart: "Cart",
          Shop: "Shop",
        },
      },
    },
  },
};

export default function App() {
  const [STRIPE_PUBLISHABLEKEY, setSTRIPE_PUBLISHABLEKEY] = React.useState("");

  React.useEffect(() => {
    getKeysApi().then((response) => {
      setSTRIPE_PUBLISHABLEKEY(response?.data?.stripe_api_key);
    });
  }, []);

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLEKEY}
      merchantIdentifier="merchant.cl.premiumycodigos.app"
    >
      <AuthProvider>
        <RootSiblingParent>
          <NavigationContainer linking={linking}>
            <NotificationApp>
              <Navigation />
            </NotificationApp>
          </NavigationContainer>
        </RootSiblingParent>
      </AuthProvider>
    </StripeProvider>
  );
}
