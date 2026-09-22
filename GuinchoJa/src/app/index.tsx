import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";

type Tela =
  | "inicio"
  | "problema"
  | "destino"
  | "confirmar"
  | "buscando"
  | "finalizado";

export default function Index() {
  const [tela, setTela] = useState<Tela>("inicio");
  const [problema, setProblema] = useState("");
  const [destino, setDestino] = useState("");

  const problemas = [
    {
      nome: "Pane mecânica",
      icone: "⚙️",
    },
    {
      nome: "Pneu furado",
      icone: "🛞",
    },
    {
      nome: "Bateria descarregada",
      icone: "🔋",
    },
    {
      nome: "Acidente",
      icone: "🚗",
    },
    {
      nome: "Outro",
      icone: "•••",
    },
  ];

  function reiniciar() {
    setProblema("");
    setDestino("");
    setTela("inicio");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111111" />

      {/* =========================
          TELA INICIAL
      ========================= */}

      {tela === "inicio" && (
        <View style={styles.container}>
          <Header />

          <ScrollView
            contentContainerStyle={styles.homeScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mapa}>
              <View style={styles.rua1} />
              <View style={styles.rua2} />
              <View style={styles.rua3} />
              <View style={styles.rua4} />

              <View style={styles.localizacaoArea}>
                <View style={styles.localizacaoPonto} />
              </View>

              <View style={styles.localizacaoLabel}>
                <Text style={styles.localizacaoLabelText}>
                  📍 Sua localização
                </Text>
              </View>
            </View>

            <View style={styles.homeCard}>
              <Text style={styles.tituloPrincipal}>
                Precisa de ajuda?
              </Text>

              <Text style={styles.descricao}>
                Encontre um guincho próximo de forma rápida,
                simples e segura.
              </Text>

              <TouchableOpacity
                style={styles.botaoPrincipal}
                onPress={() => setTela("problema")}
                activeOpacity={0.8}
              >
                <Text style={styles.botaoPrincipalTexto}>
                  🚛 Solicitar Guincho
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.informacoesRapidas}>
              <View style={styles.infoRapida}>
                <View style={styles.infoIcone}>
                  <Text>⚡</Text>
                </View>

                <Text style={styles.infoTitulo}>
                  Atendimento rápido
                </Text>

                <Text style={styles.infoDescricao}>
                  Encontre prestadores próximos de você.
                </Text>
              </View>

              <View style={styles.infoRapida}>
                <View style={styles.infoIcone}>
                  <Text>🛡️</Text>
                </View>

                <Text style={styles.infoTitulo}>
                  Mais segurança
                </Text>

                <Text style={styles.infoDescricao}>
                  Acompanhe todas as etapas do atendimento.
                </Text>
              </View>
            </View>
          </ScrollView>

          <BottomMenu />
        </View>
      )}

      {/* =========================
          PROBLEMA
      ========================= */}

      {tela === "problema" && (
        <View style={styles.container}>
          <TopBar
            titulo="Solicitar guincho"
            voltar={() => setTela("inicio")}
          />

          <ScrollView
            contentContainerStyle={styles.pagina}
            showsVerticalScrollIndicator={false}
          >
            <Steps atual={1} />

            <Text style={styles.tituloPagina}>
              O que aconteceu?
            </Text>

            <Text style={styles.subtituloPagina}>
              Selecione o problema do seu veículo.
            </Text>

            <View style={styles.listaProblemas}>
              {problemas.map((item) => {
                const selecionado =
                  problema === item.nome;

                return (
                  <TouchableOpacity
                    key={item.nome}
                    activeOpacity={0.8}
                    style={[
                      styles.opcaoProblema,
                      selecionado &&
                        styles.opcaoProblemaSelecionada,
                    ]}
                    onPress={() =>
                      setProblema(item.nome)
                    }
                  >
                    <View style={styles.opcaoEsquerda}>
                      <View
                        style={[
                          styles.iconeProblema,
                          selecionado &&
                            styles.iconeProblemaSelecionado,
                        ]}
                      >
                        <Text
                          style={styles.iconeProblemaTexto}
                        >
                          {item.icone}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.opcaoTexto,
                          selecionado &&
                            styles.opcaoTextoSelecionado,
                        ]}
                      >
                        {item.nome}
                      </Text>
                    </View>

                    {selecionado && (
                      <View style={styles.check}>
                        <Text style={styles.checkTexto}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              disabled={!problema}
              style={[
                styles.botaoPrincipal,
                !problema && styles.botaoDesabilitado,
              ]}
              onPress={() => setTela("destino")}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoPrincipalTexto}>
                Continuar
              </Text>
            </TouchableOpacity>

            <BotaoSecundario
              texto="Voltar"
              onPress={() => setTela("inicio")}
            />
          </ScrollView>
        </View>
      )}

      {/* =========================
          DESTINO
      ========================= */}

      {tela === "destino" && (
        <View style={styles.container}>
          <TopBar
            titulo="Solicitar guincho"
            voltar={() => setTela("problema")}
          />

          <ScrollView
            contentContainerStyle={styles.pagina}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Steps atual={2} />

            <Text style={styles.tituloPagina}>
              Para onde vamos?
            </Text>

            <Text style={styles.subtituloPagina}>
              Informe o local onde deseja levar o seu
              veículo.
            </Text>

            <View style={styles.campoContainer}>
              <Text style={styles.campoIcone}>
                📍
              </Text>

              <TextInput
                style={styles.campo}
                placeholder="Ex: Oficina do João"
                placeholderTextColor="#8B8B8B"
                value={destino}
                onChangeText={setDestino}
              />

              {destino.length > 0 && (
                <TouchableOpacity
                  onPress={() => setDestino("")}
                >
                  <Text style={styles.limparCampo}>
                    ×
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.mapaDestino}>
              <View style={styles.mapaRuaVertical} />
              <View style={styles.mapaRuaHorizontal} />
              <View style={styles.mapaRuaDiagonal} />

              <View style={styles.rota1} />
              <View style={styles.rota2} />

              <View style={styles.pontoInicial}>
                <View style={styles.pontoInicialDentro} />
              </View>

              <View style={styles.pinoDestino}>
                <Text style={styles.pinoDestinoTexto}>
                  📍
                </Text>
              </View>

              <Text style={styles.mapaTextoInicio}>
                Você
              </Text>

              <Text style={styles.mapaTextoDestino}>
                Destino
              </Text>
            </View>

            <TouchableOpacity
              disabled={!destino.trim()}
              style={[
                styles.botaoPrincipal,
                !destino.trim() &&
                  styles.botaoDesabilitado,
              ]}
              onPress={() => setTela("confirmar")}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoPrincipalTexto}>
                Continuar
              </Text>
            </TouchableOpacity>

            <BotaoSecundario
              texto="Voltar"
              onPress={() => setTela("problema")}
            />
          </ScrollView>
        </View>
      )}

      {/* =========================
          CONFIRMAR
      ========================= */}

      {tela === "confirmar" && (
        <View style={styles.container}>
          <TopBar
            titulo="Solicitar guincho"
            voltar={() => setTela("destino")}
          />

          <ScrollView
            contentContainerStyle={styles.pagina}
            showsVerticalScrollIndicator={false}
          >
            <Steps atual={3} />

            <Text style={styles.tituloPagina}>
              Confirmar solicitação
            </Text>

            <Text style={styles.subtituloPagina}>
              Confira os detalhes antes de solicitar o
              guincho.
            </Text>

            <View style={styles.resumoCard}>
              <ResumoItem
                icone="⚙️"
                titulo="Problema"
                valor={problema}
              />

              <Separador />

              <ResumoItem
                icone="📍"
                titulo="Destino"
                valor={destino}
              />

              <Separador />

              <ResumoItem
                icone="↔️"
                titulo="Distância estimada"
                valor="8 km"
              />

              <Separador />

              <ResumoItem
                icone="💰"
                titulo="Valor estimado"
                valor="R$ 95,00"
              />
            </View>

            <View style={styles.aviso}>
              <Text style={styles.avisoIcone}>
                ⓘ
              </Text>

              <Text style={styles.avisoTexto}>
                O valor apresentado é apenas uma estimativa
                e pode variar conforme o trajeto.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoPrincipal}
              onPress={() => setTela("buscando")}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoPrincipalTexto}>
                Confirmar Guincho
              </Text>
            </TouchableOpacity>

            <BotaoSecundario
              texto="Voltar"
              onPress={() => setTela("destino")}
            />
          </ScrollView>
        </View>
      )}

      {/* =========================
          GUINCHO ENCONTRADO
      ========================= */}

      {tela === "buscando" && (
        <View style={styles.container}>
          <Header />

          <ScrollView
            contentContainerStyle={styles.pagina}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.tituloPagina}>
              Guincho encontrado!
            </Text>

            <Text style={styles.subtituloPagina}>
              Encontramos um prestador próximo da sua
              localização.
            </Text>

            <View style={styles.loaderArea}>
              <View style={styles.loaderCirculo}>
                <Text style={styles.loaderEmoji}>
                  🚛
                </Text>
              </View>
            </View>

            <View style={styles.motoristaCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>
                  👨‍🔧
                </Text>
              </View>

              <View style={styles.motoristaInfo}>
                <Text style={styles.motoristaNome}>
                  Carlos Silva
                </Text>

                <Text style={styles.motoristaAvaliacao}>
                  ⭐ 4.9
                </Text>

                <Text style={styles.motoristaVeiculo}>
                  Mercedes Accelo • ABC-1D23
                </Text>
              </View>

              <Text style={styles.setaCard}>
                ›
              </Text>
            </View>

            <View style={styles.statusCard}>
              <View style={styles.statusIcone}>
                <Text style={styles.statusEmoji}>
                  🚛
                </Text>
              </View>

              <View style={styles.statusConteudo}>
                <Text style={styles.statusTitulo}>
                  O guincho está a caminho
                </Text>

                <Text style={styles.statusTexto}>
                  Chegada em aproximadamente 8 minutos.
                </Text>
              </View>
            </View>

            <View style={styles.mapaRastreamento}>
              <View style={styles.rastreamentoRua1} />
              <View style={styles.rastreamentoRua2} />

              <View style={styles.guichoMapa}>
                <Text>🚛</Text>
              </View>

              <View style={styles.linhaRastreamento} />

              <View style={styles.usuarioMapa}>
                <View style={styles.usuarioMapaDentro} />
              </View>

              <Text style={styles.textoGuinchoMapa}>
                Guincho
              </Text>

              <Text style={styles.textoUsuarioMapa}>
                Você
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoPrincipal}
              onPress={() => setTela("finalizado")}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoPrincipalTexto}>
                Simular chegada
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* =========================
          FINALIZADO
      ========================= */}

      {tela === "finalizado" && (
        <View style={styles.container}>
          <Header />

          <ScrollView
            contentContainerStyle={
              styles.finalizadoContainer
            }
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sucessoCirculo}>
              <Text style={styles.sucessoCheck}>
                ✓
              </Text>
            </View>

            <Text style={styles.finalizadoTitulo}>
              Atendimento finalizado!
            </Text>

            <Text style={styles.finalizadoDescricao}>
              Seu veículo chegou ao destino com sucesso.
            </Text>

            <View style={styles.finalResumo}>
              <Text style={styles.finalResumoTitulo}>
                Resumo
              </Text>

              <View style={styles.finalLinha}>
                <Text style={styles.finalLabel}>
                  Serviço
                </Text>

                <Text style={styles.finalValor}>
                  {problema}
                </Text>
              </View>

              <View style={styles.finalLinha}>
                <Text style={styles.finalLabel}>
                  Destino
                </Text>

                <Text
                  style={styles.finalValor}
                  numberOfLines={1}
                >
                  {destino}
                </Text>
              </View>

              <View style={styles.finalLinha}>
                <Text style={styles.finalLabel}>
                  Total
                </Text>

                <Text style={styles.finalValorDestaque}>
                  R$ 95,00
                </Text>
              </View>
            </View>

            <Text style={styles.avaliacaoTitulo}>
              Como foi seu atendimento?
            </Text>

            <View style={styles.estrelas}>
              <Text style={styles.estrela}>⭐</Text>
              <Text style={styles.estrela}>⭐</Text>
              <Text style={styles.estrela}>⭐</Text>
              <Text style={styles.estrela}>⭐</Text>
              <Text style={styles.estrela}>⭐</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.botaoPrincipal,
                styles.botaoFinalizado,
              ]}
              onPress={reiniciar}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoPrincipalTexto}>
                Voltar ao início
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

/* =========================
   COMPONENTES
========================= */

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>
          Guincho
          <Text style={styles.logoAmarelo}>
            Já
          </Text>
        </Text>

        <Text style={styles.logoSubtitulo}>
          Seu guincho a poucos cliques
        </Text>
      </View>

      <Text style={styles.menuIcone}>
        ☰
      </Text>
    </View>
  );
}

function TopBar({
  titulo,
  voltar,
}: {
  titulo: string;
  voltar: () => void;
}) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={voltar}
        style={styles.voltarArea}
      >
        <Text style={styles.voltarSeta}>
          ‹
        </Text>
      </TouchableOpacity>

      <Text style={styles.topBarTitulo}>
        {titulo}
      </Text>

      <View style={styles.voltarArea} />
    </View>
  );
}

function Steps({
  atual,
}: {
  atual: number;
}) {
  return (
    <View style={styles.steps}>
      {[1, 2, 3].map((numero) => (
        <React.Fragment key={numero}>
          <View
            style={[
              styles.stepBolinha,
              numero <= atual &&
                styles.stepBolinhaAtiva,
            ]}
          />

          {numero < 3 && (
            <View
              style={[
                styles.stepLinha,
                numero < atual &&
                  styles.stepLinhaAtiva,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

function BotaoSecundario({
  texto,
  onPress,
}: {
  texto: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.botaoSecundario}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.botaoSecundarioTexto}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

function ResumoItem({
  icone,
  titulo,
  valor,
}: {
  icone: string;
  titulo: string;
  valor: string;
}) {
  return (
    <View style={styles.resumoItem}>
      <View style={styles.resumoIconeArea}>
        <Text style={styles.resumoIcone}>
          {icone}
        </Text>
      </View>

      <View style={styles.resumoConteudo}>
        <Text style={styles.resumoTitulo}>
          {titulo}
        </Text>

        <Text style={styles.resumoValor}>
          {valor}
        </Text>
      </View>
    </View>
  );
}

function Separador() {
  return (
    <View style={styles.separador} />
  );
}

function BottomMenu() {
  return (
    <View style={styles.bottomMenu}>
      <View style={styles.bottomItem}>
        <Text style={styles.bottomIconeAtivo}>
          ⌂
        </Text>

        <Text style={styles.bottomTextoAtivo}>
          Início
        </Text>
      </View>

      <View style={styles.bottomItem}>
        <Text style={styles.bottomIcone}>
          ◷
        </Text>

        <Text style={styles.bottomTexto}>
          Histórico
        </Text>
      </View>

      <View style={styles.bottomItem}>
        <Text style={styles.bottomIcone}>
          ?
        </Text>

        <Text style={styles.bottomTexto}>
          Ajuda
        </Text>
      </View>

      <View style={styles.bottomItem}>
        <Text style={styles.bottomIcone}>
          ♙
        </Text>

        <Text style={styles.bottomTexto}>
          Perfil
        </Text>
      </View>
    </View>
  );
}

/* =========================
   ESTILOS
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F8",
  },

  homeScroll: {
    paddingBottom: 110,
  },

  /* HEADER */

  header: {
    backgroundColor: "#111111",
    paddingHorizontal: 22,
    paddingVertical: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  logoAmarelo: {
    color: "#FFB800",
  },

  logoSubtitulo: {
    marginTop: 2,
    color: "#B7B7B7",
    fontSize: 12,
  },

  menuIcone: {
    fontSize: 25,
    color: "#FFFFFF",
  },

  /* MAPA HOME */

  mapa: {
    height: 290,
    backgroundColor: "#E3E8EB",
    overflow: "hidden",
    position: "relative",
  },

  rua1: {
    position: "absolute",
    width: 500,
    height: 16,
    backgroundColor: "#FFFFFF",
    top: 70,
    left: -60,
    transform: [{ rotate: "18deg" }],
  },

  rua2: {
    position: "absolute",
    width: 500,
    height: 13,
    backgroundColor: "#FFFFFF",
    top: 170,
    left: -50,
    transform: [{ rotate: "-15deg" }],
  },

  rua3: {
    position: "absolute",
    width: 14,
    height: 400,
    backgroundColor: "#FFFFFF",
    top: -40,
    left: 110,
  },

  rua4: {
    position: "absolute",
    width: 13,
    height: 400,
    backgroundColor: "#FFFFFF",
    top: -40,
    right: 85,
    transform: [{ rotate: "10deg" }],
  },

  localizacaoArea: {
    position: "absolute",
    top: 95,
    alignSelf: "center",

    width: 85,
    height: 85,

    borderRadius: 45,
    backgroundColor: "rgba(255,184,0,0.25)",

    justifyContent: "center",
    alignItems: "center",
  },

  localizacaoPonto: {
    width: 24,
    height: 24,
    borderRadius: 12,

    backgroundColor: "#FFB800",

    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  localizacaoLabel: {
    position: "absolute",

    alignSelf: "center",
    top: 190,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 13,
    paddingVertical: 7,

    borderRadius: 20,

    elevation: 3,
  },

  localizacaoLabelText: {
    color: "#454545",
    fontWeight: "600",
    fontSize: 12,
  },

  /* HOME */

  homeCard: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 18,
    marginTop: -25,

    paddingHorizontal: 24,
    paddingVertical: 25,

    borderRadius: 22,

    elevation: 5,
  },

  tituloPrincipal: {
    fontSize: 27,
    fontWeight: "900",
    color: "#111111",
    textAlign: "center",
  },

  descricao: {
    marginTop: 9,

    fontSize: 15,
    lineHeight: 21,

    textAlign: "center",

    color: "#696969",
  },

  botaoPrincipal: {
    marginTop: 20,

    backgroundColor: "#FFB800",

    minHeight: 55,

    borderRadius: 13,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 20,
  },

  botaoPrincipalTexto: {
    color: "#111111",
    fontWeight: "900",
    fontSize: 16,
  },

  botaoDesabilitado: {
    backgroundColor: "#DADADA",
  },

  informacoesRapidas: {
    flexDirection: "row",
    paddingHorizontal: 18,
    marginTop: 18,
  },

  infoRapida: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    borderRadius: 16,
    padding: 15,

    marginHorizontal: 4,

    elevation: 2,
  },

  infoIcone: {
    width: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: "#FFF1B7",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
  },

  infoTitulo: {
    fontWeight: "800",
    fontSize: 13,
    color: "#222222",
  },

  infoDescricao: {
    marginTop: 5,

    fontSize: 11,
    lineHeight: 16,

    color: "#777777",
  },

  /* BOTTOM MENU */

  bottomMenu: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: 78,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  bottomItem: {
    alignItems: "center",
    width: 70,
  },

  bottomIcone: {
    fontSize: 22,
    color: "#777777",
  },

  bottomIconeAtivo: {
    fontSize: 22,
    color: "#FFB800",
  },

  bottomTexto: {
    fontSize: 11,
    color: "#777777",
    marginTop: 3,
  },

  bottomTextoAtivo: {
    fontSize: 11,
    color: "#FFB800",
    fontWeight: "700",
    marginTop: 3,
  },

  /* TOP BAR */

  topBar: {
    height: 62,

    backgroundColor: "#111111",

    paddingHorizontal: 17,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  voltarArea: {
    width: 40,
    height: 45,

    justifyContent: "center",
  },

  voltarSeta: {
    color: "#FFFFFF",
    fontSize: 39,
    lineHeight: 40,
  },

  topBarTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  /* PÁGINAS */

  pagina: {
    padding: 22,
    paddingBottom: 45,
  },

  tituloPagina: {
    fontSize: 27,
    fontWeight: "900",
    color: "#151515",
  },

  subtituloPagina: {
    marginTop: 7,
    marginBottom: 22,

    color: "#6F6F6F",

    fontSize: 14,
    lineHeight: 20,
  },

  /* STEPS */

  steps: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 27,
  },

  stepBolinha: {
    width: 12,
    height: 12,

    borderRadius: 6,

    backgroundColor: "#D0D0D0",
  },

  stepBolinhaAtiva: {
    backgroundColor: "#FFB800",
  },

  stepLinha: {
    width: 45,
    height: 3,

    backgroundColor: "#D0D0D0",
  },

  stepLinhaAtiva: {
    backgroundColor: "#FFB800",
  },

  /* PROBLEMAS */

  listaProblemas: {
    marginTop: 2,
  },

  opcaoProblema: {
    minHeight: 65,

    backgroundColor: "#FFFFFF",

    borderRadius: 13,

    borderWidth: 1,
    borderColor: "#E2E2E2",

    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 10,
  },

  opcaoProblemaSelecionada: {
    backgroundColor: "#171717",
    borderColor: "#171717",
  },

  opcaoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconeProblema: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: "#F1F1F1",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 13,
  },

  iconeProblemaSelecionado: {
    backgroundColor: "#303030",
  },

  iconeProblemaTexto: {
    fontSize: 18,
  },

  opcaoTexto: {
    color: "#242424",
    fontWeight: "700",
    fontSize: 15,
  },

  opcaoTextoSelecionado: {
    color: "#FFFFFF",
  },

  check: {
    width: 25,
    height: 25,

    backgroundColor: "#FFB800",

    borderRadius: 13,

    justifyContent: "center",
    alignItems: "center",
  },

  checkTexto: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  /* BOTÃO SECUNDÁRIO */

  botaoSecundario: {
    minHeight: 52,

    marginTop: 10,

    borderRadius: 13,

    backgroundColor: "#E9ECEF",

    justifyContent: "center",
    alignItems: "center",
  },

  botaoSecundarioTexto: {
    color: "#252525",
    fontWeight: "800",
    fontSize: 15,
  },

  /* DESTINO */

  campoContainer: {
    minHeight: 58,

    backgroundColor: "#FFFFFF",

    borderRadius: 13,

    borderWidth: 1,
    borderColor: "#DCDCDC",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,

    marginBottom: 18,
  },

  campoIcone: {
    fontSize: 20,
    marginRight: 9,
  },

  campo: {
    flex: 1,
    fontSize: 15,
    color: "#171717",
  },

  limparCampo: {
    fontSize: 25,
    color: "#777777",
  },

  mapaDestino: {
    height: 225,

    backgroundColor: "#E3E8EB",

    borderRadius: 18,

    overflow: "hidden",

    position: "relative",
  },

  mapaRuaVertical: {
    position: "absolute",

    width: 13,
    height: 300,

    backgroundColor: "#FFFFFF",

    left: 110,
    top: -20,
  },

  mapaRuaHorizontal: {
    position: "absolute",

    width: 400,
    height: 13,

    backgroundColor: "#FFFFFF",

    left: -30,
    top: 130,

    transform: [{ rotate: "-8deg" }],
  },

  mapaRuaDiagonal: {
    position: "absolute",

    width: 350,
    height: 12,

    backgroundColor: "#FFFFFF",

    left: -30,
    top: 80,

    transform: [{ rotate: "25deg" }],
  },

  rota1: {
    position: "absolute",

    width: 120,
    height: 5,

    backgroundColor: "#1C2D47",

    left: 70,
    top: 130,

    transform: [{ rotate: "-7deg" }],
  },

  rota2: {
    position: "absolute",

    width: 105,
    height: 5,

    backgroundColor: "#1C2D47",

    left: 177,
    top: 94,

    transform: [{ rotate: "-39deg" }],
  },

  pontoInicial: {
    position: "absolute",

    width: 27,
    height: 27,

    borderRadius: 14,

    backgroundColor: "#FFFFFF",

    left: 60,
    top: 116,

    justifyContent: "center",
    alignItems: "center",

    elevation: 3,
  },

  pontoInicialDentro: {
    width: 17,
    height: 17,

    borderRadius: 9,

    backgroundColor: "#2879F3",
  },

  pinoDestino: {
    position: "absolute",

    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#FFB800",

    right: 40,
    top: 38,

    alignItems: "center",
    justifyContent: "center",

    elevation: 4,
  },

  pinoDestinoTexto: {
    fontSize: 23,
  },

  mapaTextoInicio: {
    position: "absolute",

    left: 34,
    bottom: 25,

    color: "#6D7378",
    fontSize: 12,
  },

  mapaTextoDestino: {
    position: "absolute",

    right: 27,
    top: 95,

    color: "#6D7378",
    fontSize: 12,
  },

  /* RESUMO */

  resumoCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 18,

    elevation: 3,
  },

  resumoItem: {
    minHeight: 52,

    flexDirection: "row",
    alignItems: "center",
  },

  resumoIconeArea: {
    width: 42,
  },

  resumoIcone: {
    fontSize: 20,
  },

  resumoConteudo: {
    flex: 1,
  },

  resumoTitulo: {
    color: "#8A8A8A",
    fontSize: 12,
  },

  resumoValor: {
    marginTop: 2,

    color: "#181818",

    fontSize: 15,
    fontWeight: "800",
  },

  separador: {
    height: 1,
    backgroundColor: "#ECECEC",
  },

  aviso: {
    marginTop: 15,

    backgroundColor: "#EDEFF1",

    borderRadius: 13,

    padding: 14,

    flexDirection: "row",
    alignItems: "center",
  },

  avisoIcone: {
    fontSize: 20,
    marginRight: 10,
  },

  avisoTexto: {
    flex: 1,

    color: "#666666",

    fontSize: 12,
    lineHeight: 17,
  },

  /* BUSCANDO */

  loaderArea: {
    height: 115,

    justifyContent: "center",
    alignItems: "center",
  },

  loaderCirculo: {
    width: 80,
    height: 80,

    borderRadius: 40,

    borderWidth: 7,
    borderColor: "#FFB800",

    alignItems: "center",
    justifyContent: "center",
  },

  loaderEmoji: {
    fontSize: 30,
  },

  motoristaCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 17,

    borderWidth: 1,
    borderColor: "#E4E4E4",

    padding: 14,

    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: "#EEEEEE",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 13,
  },

  avatarEmoji: {
    fontSize: 33,
  },

  motoristaInfo: {
    flex: 1,
  },

  motoristaNome: {
    color: "#171717",

    fontSize: 17,
    fontWeight: "900",
  },

  motoristaAvaliacao: {
    marginTop: 3,

    color: "#444444",

    fontSize: 13,
    fontWeight: "600",
  },

  motoristaVeiculo: {
    marginTop: 3,

    color: "#888888",

    fontSize: 12,
  },

  setaCard: {
    fontSize: 30,
    color: "#777777",
  },

  statusCard: {
    marginTop: 14,

    backgroundColor: "#FFF2C3",

    borderRadius: 17,

    padding: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  statusIcone: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#FFD65A",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  statusEmoji: {
    fontSize: 24,
  },

  statusConteudo: {
    flex: 1,
  },

  statusTitulo: {
    color: "#171717",

    fontSize: 14,
    fontWeight: "900",
  },

  statusTexto: {
    marginTop: 4,

    color: "#665C42",

    fontSize: 12,
    lineHeight: 17,
  },

  mapaRastreamento: {
    height: 170,

    marginTop: 15,

    backgroundColor: "#E3E8EB",

    borderRadius: 17,

    position: "relative",
    overflow: "hidden",
  },

  rastreamentoRua1: {
    position: "absolute",

    width: 400,
    height: 13,

    backgroundColor: "#FFFFFF",

    top: 50,
    left: -30,

    transform: [{ rotate: "15deg" }],
  },

  rastreamentoRua2: {
    position: "absolute",

    width: 13,
    height: 250,

    backgroundColor: "#FFFFFF",

    top: -30,
    right: 100,

    transform: [{ rotate: "10deg" }],
  },

  guichoMapa: {
    position: "absolute",

    width: 45,
    height: 45,

    borderRadius: 23,

    backgroundColor: "#FFB800",

    left: 35,
    top: 65,

    justifyContent: "center",
    alignItems: "center",
  },

  linhaRastreamento: {
    position: "absolute",

    height: 4,
    width: 200,

    backgroundColor: "#1D2C46",

    left: 76,
    top: 85,

    transform: [{ rotate: "-5deg" }],
  },

  usuarioMapa: {
    position: "absolute",

    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: "#FFFFFF",

    right: 40,
    top: 64,

    justifyContent: "center",
    alignItems: "center",
  },

  usuarioMapaDentro: {
    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#2878F1",
  },

  textoGuinchoMapa: {
    position: "absolute",

    left: 27,
    bottom: 22,

    fontSize: 11,

    color: "#666666",
  },

  textoUsuarioMapa: {
    position: "absolute",

    right: 37,
    bottom: 22,

    fontSize: 11,

    color: "#666666",
  },

  /* FINALIZADO */

  finalizadoContainer: {
    paddingHorizontal: 25,
    paddingVertical: 38,

    alignItems: "center",
  },

  sucessoCirculo: {
    width: 95,
    height: 95,

    borderRadius: 48,

    backgroundColor: "#21B26F",

    justifyContent: "center",
    alignItems: "center",
  },

  sucessoCheck: {
    color: "#FFFFFF",

    fontSize: 50,
    fontWeight: "900",
  },

  finalizadoTitulo: {
    marginTop: 24,

    fontSize: 26,
    fontWeight: "900",

    color: "#171717",

    textAlign: "center",
  },

  finalizadoDescricao: {
    marginTop: 8,

    color: "#777777",

    fontSize: 14,
    lineHeight: 20,

    textAlign: "center",
  },

  finalResumo: {
    width: "100%",

    marginTop: 28,

    backgroundColor: "#FFFFFF",

    borderRadius: 17,

    padding: 18,

    elevation: 2,
  },

  finalResumoTitulo: {
    color: "#171717",

    fontSize: 16,
    fontWeight: "900",

    marginBottom: 10,
  },

  finalLinha: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 9,
  },

  finalLabel: {
    color: "#777777",
    fontSize: 13,
  },

  finalValor: {
    maxWidth: "60%",

    color: "#222222",

    fontSize: 13,
    fontWeight: "700",
  },

  finalValorDestaque: {
    color: "#111111",

    fontSize: 16,
    fontWeight: "900",
  },

  avaliacaoTitulo: {
    marginTop: 28,

    color: "#333333",

    fontSize: 15,
    fontWeight: "700",
  },

  estrelas: {
    flexDirection: "row",
    marginTop: 13,
    marginBottom: 12,
  },

  estrela: {
    fontSize: 29,
    marginHorizontal: 2,
  },

  botaoFinalizado: {
    width: "100%",
  },
});