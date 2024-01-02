import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import i18n from './src/localization/i18n'
import Home from './src/Screens/Home';
import { Provider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import AppContainer from './src/route/AppNavigation';
import RegisterScreen from './src/Screens/RegisterScreen';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

// import AppContainer from './src/route/AppNavigation';
const Stack = createStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"
  const Auth = () => {
    // Stack Navigator for Login and Sign up Screen

    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  if (!fontsLoaded) {
    <AppLoading />
  } else {
    return (
      <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{ headerShown: false }}
            />
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
              name="AppContainer"
              component={AppContainer}
              // Hiding header for Navigation Drawer
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
