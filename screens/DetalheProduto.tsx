import * as React from "react";
import { View, Text } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from "react-number-format";

export default function DetalheProduto({ route }) {
  const { idproduto } = route.params;
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://192.168.0.2:8080/projeto/service/produto/detalheproduto.php?idproduto=${idproduto}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) =>
        console.error(`Erro ao tentar o carregar o produto ${error}`)
      )
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      {carregado ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={tela.conteiner}>
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto1}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto2}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto3}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto4}`,
                }}
                style={tela.img}
              />
              <Text style={tela.nome}>{item.nomeproduto}</Text>
              <Text style={tela.txt}>{item.descricao}</Text>

              <Text style={tela.preco}>
                <NumberFormat
                  value={item.preco}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(valor) => <Text>{valor}</Text>}
                />
              </Text>
              <TouchableOpacity
                onPress={() => {
                  adicionarAoCarrinho();
                }}
                style={tela.link}
              >
                <Text style={tela.carrinho}>Adiciona ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    borderRadius: 10,

    marginTop: 10,
    width: "100%",
    height: 250,
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  link: {
    padding: 10,
    fontWeight: "bold",
  },
  conteiner: {
    width: 130,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#1b5e20",
  },
  nome: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 11,
    fontSize: 19,
    marginBottom: 2,
  },
  txt: {
    color: "white",
    textAlign: "center",
    padding: 11,
    fontSize: 19,
  },
  preco: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginTop: 20,
    marginBottom: 13,
  },
  carrinho: {
    backgroundColor: "#ffea00",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 13,
  },
});
