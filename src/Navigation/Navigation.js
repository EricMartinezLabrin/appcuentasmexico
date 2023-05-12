import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import MyAccount from "../screen/MyAccount";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
