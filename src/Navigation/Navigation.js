//Librerias

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

//Local

import AccountNavigation from "./AccountNavigation";
import ShopNavigation from "./ShopNavigation";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ShopNavigation"
        component={ShopNavigation}
        options={{
          title: "Tienda",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="AccountNavigation"
        component={AccountNavigation}
        options={{
          title: "Mi cuenta",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
