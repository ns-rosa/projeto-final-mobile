import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import db from '../../../services/SQLiteDatabase';
import TelaPesquisarCriptoCliente from '../TelaPesquisarCriptoCliente';
import TelaCarteiraCriptoCliente from '../TelaCarteiraCriptoCliente';

const Tab = createBottomTabNavigator();

// Nessa tela ocorre navegação por TAB!
export default function TelaInicialCliente() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Pesquisar Criptos"
        component={TelaPesquisarCriptoCliente}
        db={db}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Criptos Registradas"
        component={TelaCarteiraCriptoCliente}
        db={db}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


