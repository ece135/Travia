
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreateTripScreen from '../screens/CreateTripScreen';
import TripRouteScreen from '../screens/TripRouteScreen';
import BudgetScreen from '../screens/BudgetScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
        <Stack.Screen name="TripRoute" component={TripRouteScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}