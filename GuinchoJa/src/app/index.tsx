import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function Index() {
  const [tela, setTela] = useState("inicio");
  const [problema, setProblema] = useState("");
  const [destino, setDestino] = useState("");

  function voltarInicio() {
    setProblema("");
    setDestino("");
    setTela("inicio");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.logo}>GuinchoJá</Text>
        <Text style={styles.subtitulo}>Solicitação de guincho</Text>
      </View>

      {tela === "inicio" && (
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Precisa de um guincho?</Text>

          <Text style={styles.texto}>
            Faça uma solicitação e encontre um guincho para levar seu veículo.
          </Text>

          <View style={styles.caixaLocal}>
            <Text style={styles.label}>Localização atual</Text>
            <Text style={styles.valor}>Sua localização foi encontrada</Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTela("problema")}
          >
            <Text style={styles.textoBotao}>Solicitar guincho</Text>
          </TouchableOpacity>
        </View>
      )}

      {tela === "problema" && (
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Qual é o problema?</Text>

          <Text style={styles.texto}>
            Escolha uma das opções abaixo.
          </Text>

          {[
            "Pane mecânica",
            "Pneu furado",
            "Bateria descarregada",
            "Acidente",
            "Outro",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.opcao,
                problema === item && styles.opcaoSelecionada,
              ]}
              onPress={() => setProblema(item)}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  problema === item && styles.textoSelecionado,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.botao,
              problema === "" && styles.botaoDesativado,
            ]}
            disabled={problema === ""}
            onPress={() => setTela("destino")}
          >
            <Text style={styles.textoBotao}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => setTela("inicio")}
          >
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {tela === "destino" && (
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Destino do veículo</Text>

          <Text style={styles.texto}>
            Digite para onde o veículo deve ser levado.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Oficina Central"
            value={destino}
            onChangeText={setDestino}
          />

          <TouchableOpacity
            style={[
              styles.botao,
              destino === "" && styles.botaoDesativado,
            ]}
            disabled={destino === ""}
            onPress={() => setTela("confirmacao")}
          >
            <Text style={styles.textoBotao}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => setTela("problema")}
          >
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {tela === "confirmacao" && (
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Confirmar solicitação</Text>

          <View style={styles.resumo}>
            <Text style={styles.label}>Problema</Text>
            <Text style={styles.valor}>{problema}</Text>

            <View style={styles.linha} />

            <Text style={styles.label}>Destino</Text>
            <Text style={styles.valor}>{destino}</Text>

            <View style={styles.linha} />

            <Text style={styles.label}>Valor estimado</Text>
            <Text style={styles.preco}>R$ 95,00</Text>
          </View>

          <Text style={styles.aviso}>
            O valor é apenas uma estimativa e pode mudar de acordo com a
            distância.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTela("sucesso")}
          >
            <Text style={styles.textoBotao}>Confirmar pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => setTela("destino")}
          >
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {tela === "sucesso" && (
        <View style={styles.conteudo}>
          <View style={styles.confirmado}>
            <Text style={styles.check}>OK</Text>
          </View>

          <Text style={styles.tituloCentro}>Guincho solicitado</Text>

          <Text style={styles.textoCentro}>
            Sua solicitação foi enviada. Um motorista está indo até sua
            localização.
          </Text>

          <View style={styles.resumo}>
            <Text style={styles.label}>Motorista</Text>
            <Text style={styles.valor}>Carlos Silva</Text>

            <View style={styles.linha} />

            <Text style={styles.label}>Tempo estimado</Text>
            <Text style={styles.valor}>8 minutos</Text>

            <View style={styles.linha} />

            <Text style={styles.label}>Veículo</Text>
            <Text style={styles.valor}>Mercedes Accelo</Text>
          </View>

          <TouchableOpacity style={styles.botao} onPress={voltarInicio}>
            <Text style={styles.textoBotao}>Voltar para o início</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  topo: {
    backgroundColor: "#222",
    padding: 22,
  },

  logo: {
    color: "#ffc320",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#ddd",
    marginTop: 3,
  },

  conteudo: {
    flex: 1,
    padding: 25,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  tituloCentro: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  texto: {
    color: "#4b4b4b",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 25,
  },

  textoCentro: {
    color: "#4b4b4b",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  caixaLocal: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 8,
    marginBottom: 20,
  },

  label: {
    color: "#777",
    fontSize: 13,
    marginBottom: 5,
  },

  valor: {
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
  },

  botao: {
    backgroundColor: "#f5b400",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },

  textoBotao: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoDesativado: {
    backgroundColor: "#ccc",
  },

  botaoVoltar: {
    padding: 15,
    alignItems: "center",
    marginTop: 5,
  },

  opcao: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 17,
    borderRadius: 8,
    marginBottom: 10,
  },

  opcaoSelecionada: {
    backgroundColor: "#222",
  },

  textoOpcao: {
    fontSize: 16,
    color: "#222",
  },

  textoSelecionado: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },

  resumo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginTop: 15,
  },

  linha: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },

  preco: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  aviso: {
    color: "#777",
    marginTop: 15,
    lineHeight: 20,
  },

  confirmado: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5b400",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40,
  },

  check: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
});