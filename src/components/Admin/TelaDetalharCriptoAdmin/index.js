import React, { useState } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import { Button } from '@rneui/base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card, Input, Icon } from '@rneui/themed';
import AdminService from '../../../services/Services/AdminService';

export default function TelaInicialAdmin() {
  
  // Declarando variáveis
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item;

  // Para que os dados vindos da API sempre fiquem padronizados, a única propriedade que pode ser alterada é a de periculosidade
  const [periculosidade, setPericulosidade] = useState(item?.periculosidade || '');

  // O método abaixo serve para atualizar a cripto existente no banco 'criptos'
  const handleSalvar = () => {
    const criptoAtualizada = { ...item, periculosidade: periculosidade };

    AdminService.updateCripto(criptoAtualizada)
      .then(() => {
        navigation.navigate('Criptos Registradas', { screen: 'TelaInicialAdmin' });
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
        <Button title="Salvar" onPress={handleSalvar} />
      </Card>
    </View>
  );
}
