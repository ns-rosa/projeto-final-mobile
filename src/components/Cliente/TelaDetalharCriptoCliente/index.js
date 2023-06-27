import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { Button } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card, Input } from '@rneui/themed';
import ClienteService from '../../../services/Services/ClienteService';


export default function TelaDetalharCriptoCliente() {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item;
  const [periculosidade, setPericulosidade] = useState(item?.periculosidade || '');
  const [valor, setValor] = useState(item?.valor || '');

  // Função para salvar na tela 
  const handleSalvar = () => {
    const criptoAtualizada = { ...item, periculosidade: periculosidade, valor: valor };
    ClienteService.updateCripto(criptoAtualizada)
      .then(() => {
        navigation.navigate('Criptos Registradas', { screen: 'TelaInicialCliente' });
      })
      .catch(error => {
        console.log('Erro ao atualizar cripto:', error);
      });
  };


  return (
    <View>
      <Card>
        <View>
          <Image
            source={{ uri: item?.img_url }}
            style={{ width: 80, height: 80, marginRight: 10, marginBottom: 10 }}
          />
          <Input
            placeholder="Nome da cripto..."
            disabled
            label="Nome da Cripto"
            value={item?.nome_cripto}
          />
        </View>
        <Input
          placeholder="ID da cripto"
          disabled
          label="ID na API Coingecko"
          value={item?.id_api}
        />
        <Input
          placeholder="Símbolo..."
          disabled
          label="Símbolo da Cripto"
          value={item?.symbol}
        />
        <Input
          placeholder='Indique a periculosidade...'
          disabled={false}
          errorMessage={periculosidade === '' ? 'Ops, esse campo é obrigatório!' : ''}
          label="Edite a periculosidade da moeda"
          value={periculosidade}
          onChangeText={text => setPericulosidade(text.toUpperCase())}
        />
        <Input
          placeholder='Indique o valor correto'
          disabled={false}
          errorMessage={valor === '' ? 'Ops, esse campo é obrigatório!' : ''}
          label="Edite o valor que você possui da moeda"
          value={valor}
          onChangeText={text => setValor(text)}
        />
        <Button title="Salvar" onPress={handleSalvar} />
      </Card>
    </View>
  );
}
