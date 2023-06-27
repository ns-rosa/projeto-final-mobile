import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaPesquisarCriptoAdmin from '../TelaPesquisarCriptoAdmin';
import TelaCriptosCadastradasAdmin from '../TelaCriptosCadastradasAdmin';
import db from '../../../services/SQLiteDatabase';

// Esse componente serve para realizar a navegação em tabs!

// Criando o navigator para as tabs:
const Tab = createBottomTabNavigator();

export default function TelaInicialAdmin() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Pesquisar Novas Criptos"
        component={TelaPesquisarCriptoAdmin}
        db={db}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Criptos Registradas"
        component={TelaCriptosCadastradasAdmin}
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


