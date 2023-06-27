import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SearchBar, Card, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

import ClienteService from '../../../services/Services/ClienteService';

// Utilitário de pesquisa
const searchUtility = {
  updateSearch: (search, criptoList, setCriptoList) => {
    const filteredCriptoList = criptoList.filter(item => {
      return item.nome_cripto.toLowerCase().includes(search.toLowerCase());
    });
    setCriptoList(filteredCriptoList);
  },
  loadCriptos: (setCriptoList) => {
    ClienteService.getAllCriptos()
      .then((result) => {
        setCriptoList(result);
      })
      .catch((error) => {
        console.error('Erro ao carregar criptos:', error);
      });
  }
};

export default function TelaPesquisarCriptoCliente() {
  const [criptoList, setCriptoList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Função de pesquisa
  const handleSearch = () => {
    if (searchText !== '') {
      searchUtility.updateSearch(searchText, criptoList, setCriptoList);
    } else {
      searchUtility.loadCriptos(setCriptoList);
    }
  };

  // useEffect para dar load em todas as criptos existentes no BD ao entrar na página
  useEffect(() => {
    searchUtility.loadCriptos(setCriptoList);
  }, []);

  // useEffect para realizar pesquisa sempre que o searchText mudar
  useEffect(() => {
    handleSearch()
  }, [searchText])

  const handleIncluir = (item) => {
    ClienteService.addRegistroCarteira(item)
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Pesquise aqui uma moeda..."
        searchIcon={<Ionicons name="search-outline" />}
        clearIcon={false}
        lightTheme={true}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        value={searchText}
      />

      {criptoList.length > 0 ? (
        <FlatList
          data={criptoList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: item.img_url }}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.nome_cripto}</Text>
                  <Text>{item.symbol}</Text>
                </View>

                <Button title="Incluir na carteira" onPress={() => handleIncluir({id_cliente: 1, id_api: item.id_api, nome_cripto: item.nome_cripto, periculosidade: item.periculosidade, img_url: item.img_url, symbol: item.symbol, valor: 1})} />
              </View>
            </Card>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <Text style={styles.textPesquisar}>Ops, nenhuma moeda registrada no sistema!</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
