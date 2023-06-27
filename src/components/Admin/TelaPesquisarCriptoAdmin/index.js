import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SearchBar, Card, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AdminService from '../../../services/Services/AdminService';
import styles from './style';


export default function TelaPesquisarCriptoAdmin() {

  // Declaração de variáveis: 
  const [criptoList, setCriptoList] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Para navegação livre, usando o useNavigation
  const navigation = useNavigation();

  // FUNÇÕES DE PESQUISA ---------------------------

  // Função para dar update no searchText
  const updateSearch = (search) => {
    setSearchText(search);
  };

  // Essa função realiza a pesquisa através de fetch para a API, guardando o resultado obtido na criptoList
  const handleSearch = () => {
    if (searchText !== '') {
      fetch('https://api.coingecko.com/api/v3/search?query=' + searchText)
        .then(response => response.json())
        .then(data => {
          setCriptoList(data);
          console.log(criptoList);
        })
        .catch(error => {
          console.log('Ocorreu um erro ao processar a requisiçao query de criptos: ' + error);
        });
    } else {
      setCriptoList([]);
    }
  };

  // useEffect usado para que o search text seja atualizado sempre que a tela seja montada
  useEffect(() => {
    updateSearch();
  }, []);

  // Função para adicionar uma cripto à tabela 'criptos'
  const handleIncluir = (item) => {
    console.log(item)
    const cripto = { id_api: item.id, nome_cripto: item.name, periculosidade: 'ALTA', img_url: item.large, symbol: item.symbol };
    AdminService.addCripto(cripto);
    AdminService.getAllCriptos()
      .then((criptos) => {
        console.log("Todas as criptos:", criptos);
      })
      .catch((error) => {
        console.log("Erro ao obter criptos:", error);
      });
    navigation.navigate('Criptos Registradas', { screen: 'TelaInicialAdmin', params: { coin: item } });
  };

  // --------------------------------------------------

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Pesquise aqui uma moeda..."
        searchIcon={<Ionicons name="search-outline" />}
        clearIcon={false}
        lightTheme={true}
        onChangeText={updateSearch}
        onSubmitEditing={handleSearch}
        value={searchText}
      />

      {(criptoList == null || criptoList.length === 0) && (
        <Text style={styles.textPesquisar}>Pesquise uma moeda para iniciar!</Text>
      )}
      {(criptoList.coins !== null) && (
        <FlatList
          data={criptoList.coins}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: item.large }}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.symbol}</Text>
                  </View>

                  <Button title="Incluir"
                    onPress={() => handleIncluir(item)}
                  />

                </View>
              </Card>
            </View>
          )}
          extraData={criptoList}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}
