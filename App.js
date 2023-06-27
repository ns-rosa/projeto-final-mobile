import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/login';

import TelaInicialAdmin from './src/components/Admin/TelaInicialAdmin';
import TelaInicialCliente from './src/components/Cliente/TelaInicialCliente';
import TelaDetalharCriptoAdmin from './src/components/Admin/TelaDetalharCriptoAdmin';

import { iniciarDatabase } from './src/services/SQLiteDatabase';
import TelaDetalharCriptoCliente from './src/components/Cliente/TelaDetalharCriptoCliente';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login" component={Login}></Stack.Screen>

        <Stack.Screen
          name="TelaInicialCliente"
          component={TelaInicialCliente}
          options={{ headerShown: false, title: "Homescreen Cliente" }}>
        </Stack.Screen>
        
        <Stack.Screen
          name="TelaInicialAdmin"
          component={TelaInicialAdmin}
          options={{ headerShown: false, title: "Homescreen Administrador" }}>
        </Stack.Screen>
        <Stack.Screen name="TelaDetalharCriptoAdmin" component={TelaDetalharCriptoAdmin}></Stack.Screen>
        <Stack.Screen name="TelaDetalharCriptoCliente" component={TelaDetalharCriptoCliente}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
  );
}
