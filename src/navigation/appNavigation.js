import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";


const Stack = createNativeStackNavigator();

function AppNavigation(props) {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation