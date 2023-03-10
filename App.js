import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { store } from "./store";
import { Provider } from "react-redux";
import BasketScreen from "./screens/BasketScreen";
import SplitAccountScreen from "./screens/SplitAccountScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ModifyOrderScreen from "./screens/ModifyOrderScreen";
import LoginScreen from "./screens/LoginScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="SplitAccount"
              component={SplitAccountScreen}
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ModifyOrder"
              component={ModifyOrderScreen}
              options={{ headerShown: false, presentation: "fullScreenModal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
