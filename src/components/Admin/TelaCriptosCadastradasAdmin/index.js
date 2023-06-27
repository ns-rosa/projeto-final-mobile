import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import styles from './style';
import AdminService from '../../../services/Services/AdminService';

export default function TelaCriptosCadastradasAdmin() {

  // Declarando as variáveis
  const [criptos, setCriptos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Função para retornar todas as criptos existentes na base
  const loadCriptos = () => {
    AdminService.getAllCriptos()
      .then(criptosRetornadas => {
        console.log('chegou aqui')
        console.log(criptosRetornadas)
        setCriptos(criptosRetornadas);
      })
      .catch(error => {
        console.log('Erro ao obter criptos:', error);
      });
  };

  // Função de clique para deleção de todas as criptos existentes
  const handleDeletarTudo = () => {
    AdminService.deleteAllCriptos()
      .then(() => {
        console.log('Todas as criptos foram deletadas com sucesso!');
        loadCriptos();
      })
      .catch(error => {
        console.log('Erro ao deletar todas as criptos: ', error);
      });
  };

  // Função de clique para inclusão de uma nova cripto na tabela 'criptos'
  const handleIncluir = () => {
    navigation.navigate('Pesquisar Novas Criptos', { screen: 'TelaInicialAdmin' });
  }

  // Função clique para editar uma cripto existente
  const handleEditar = (item) => {
    navigation.navigate('TelaDetalharCriptoAdmin', { item });
  }

  // Função para deletar uma cripto
  const handleExcluir = (id) => {
    AdminService.deleteCripto(id)
      .then(() => {
        console.log("Cripto excluída com sucesso!");
        loadCriptos();
      })
      .catch(error => {
        console.log("Erro ao excluir cripto:", error);
      });
  };

  // UseFocusEffect é usado para sempre povoar o vetor de lista de criptos
  useFocusEffect(
    React.useCallback(() => {
      loadCriptos();
    }, [])
  );


  // Método para dar refresh na página com criptos atualizadas
  const handleRefresh = () => {
    setRefreshing(true);
    loadCriptos();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textPesquisar}>
        Visualize aqui todas as criptos incluídas no sistema
      </Text>

      <View style={{ flexDirection: 'row', flex: 1, marginBottom: 40, marginTop: 10 }}>
        <TouchableOpacity onPress={() => handleIncluir()} style={{ flex: 1 }}>
          <Button title="Adicionar Cripto" onPress={handleIncluir} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeletarTudo} style={{ flex: 1 }}>
          <Button title="Deletar Tudo" onPress={handleDeletarTudo} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={criptos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (!item) {
            return null; 
          }

          return (
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: item.img_url }}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.nome_cripto}</Text>
                  <Text>Periculosidade: {item.periculosidade}</Text>
                  <Text>{item.symbol}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Button title="Editar" onPress={() => handleEditar(item)} />
                </View>
                <View style={{ justifyContent: 'flex-end', marginLeft: 5 }}>
                  <Button title="Excluir" onPress={() => handleExcluir(item.id_api)} />
                </View>
              </View>
            </Card>
          );
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

    </View>
  );
}
