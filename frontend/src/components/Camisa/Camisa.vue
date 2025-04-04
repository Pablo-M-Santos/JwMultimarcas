Como faço para o btn ocupar 100% do width sem sair da quantidade-container
<template>
  <div
    class="container d-flex justify-center align-center"
    style="
      width: 100%;
      max-width: 1440px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 16px;
    "
  >
    <v-container>
      <v-row
        justify="center"
        class="produto"
      >
        <v-col
          cols="8"
          md="6"
          class="produto-imagem pr-7"
        >
          <!-- Carrossel de imagens do produto -->
          <v-carousel
            v-model="indexImagemSelecionada"
            show-arrows="hover"
            hide-delimiters
          >
            <v-carousel-item
              v-for="(imagem, i) in camisa?.img || []"
              :key="i"
            >
              <v-img
                :src="imagem"
                cover
              />
            </v-carousel-item>
          </v-carousel>

          <!-- Miniaturas -->
          <div
            ref="miniaturasContainer"
            class="miniaturas-container"
            @mousedown="iniciarArraste"
            @mousemove="arrastar"
            @mouseup="pararArraste"
            @mouseleave="pararArraste"
          >
            <div class="miniaturas">
              <img
                v-for="(imagem, i) in camisa?.img || []"
                :key="i"
                :src="imagem"
                class="miniatura"
                :class="{ 'miniatura-ativa': indexImagemSelecionada === i }"
                draggable="false"
                @click="selecionarImagem(i)"
              >
            </div>
          </div>
        </v-col>
        <!-- Coluna com informações do produto -->
        <v-col
          cols="12"
          md="6"
          class="produto-infor pl-7"
        >
          <h1 class="titulo">
            {{ camisa.nome }}
          </h1>
          <p class="preco">
            {{ camisa.preco }}
          </p>
          <div
            v-if="camisa?.exibirCor"
            class="cor-selecionada font-weight-bold"
          >
            <p>Cor: {{ corSelecionada }}</p>
            <v-btn
              v-for="(cor, index) in camisa?.cor || []"
              :key="index"
              :color="cor"
              :class="{ 'btn-ativo': corSelecionada === cor }"
              @click="selecionarCor(cor, index)"
            >
              {{ cor }}
            </v-btn>
          </div>
          <div>
            <p class="titulo-infor mt-6">
              Tamanho: {{ tamanhoSelecionado }}
            </p>
            <div class="tamanho-button">
              <v-btn
                v-for="(tamanho, index) in camisa?.tamanhos || []"
                :key="index"
                class="button-info"
                :class="{ 'btn-ativo': tamanhoSelecionado === tamanho }"
                @click="selecionarTamanho(tamanho)"
              >
                {{ tamanho }}
              </v-btn>
            </div>
          </div>

          <p class="titulo-infor mt-6 font-weight-bold">
            Quantidade
          </p>
          <div
            class="d-flex align-center quantidade-container"
          >
            <div class="container-quantidade-carrinho">
              <p
                class="quantidade-botao esquerda"
                :disabled="quantidade <= 1"
                @click="alterarQuantidade(-1)"
              >
                &minus;
              </p>
              <span class="quantidade">{{ quantidade }}</span>
              <p
                class="quantidade-botao direita"
                @click="alterarQuantidade(1)"
              >
                +
              </p>
            </div>

            <div class="finalizar-compra">
              <v-btn
                class="adicionar-carrinho"
                @click="adicionarAoCarrinho"
              >
                Adicionar ao Carrinho
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { watch, nextTick } from "vue";

const route = useRoute();
const router = useRouter();

const camisas = [
  {
    slug: "camisa-estilosa",
    img: [
      new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
    ],
    cor: ["cinza", "verde", "vermleho", "azul"],
    nome: "Camisa Estilosa",
    tamanhos: ["P", "M", "G", "GG"],
    preco: "R$ 79,90",
    exibirCor: true,
  },
  {
    slug: "camisa-casual",
    img: [
      new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
    ],
    nome: "Camisa Casual",
    tamanhos: ["P", "M", "G", "GG"],
    preco: "R$ 79,90",
    exibirCor: true,
  },
  {
    slug: "camisa-social",
    img: [
      new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
    ],
    nome: "Camisa Social",
    tamanhos: ["P", "M", "G", "GG"],
    preco: "R$ 79,90",
    exibirCor: true,
  },
  {
    slug: "camisa-classica-vasco",
    img: [
      new URL("../../assets/camisas/Vasco/vasco1.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco2.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco3.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco4.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco5.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco6.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco7.png", import.meta.url).href,
      new URL("../../assets/camisas/Vasco/vasco8.png", import.meta.url).href,

    ],
    exibirCor: false,
    nome: "Camisa Vasco I 24/25 Jogador Kappa Masculina - Preto+Branco",
    tamanhos: ["P", "M", "G", "GG"],
    preco: "R$ 79,90",
  },
];

const camisa = computed(() =>
  camisas.find((c) => c.slug === route.params.slug)
);

const scrollToMiniatura = () => {
  if (!miniaturasContainer.value) return;
  const miniaturas = miniaturasContainer.value.querySelectorAll(".miniatura");

  if (miniaturas[indexImagemSelecionada.value]) {
    const miniaturaSelecionada = miniaturas[indexImagemSelecionada.value];
    const containerRect = miniaturasContainer.value.getBoundingClientRect();
    const miniaturaRect = miniaturaSelecionada.getBoundingClientRect();

    miniaturasContainer.value.scrollTo({
      left:
        miniaturasContainer.value.scrollLeft +
        (miniaturaRect.left - containerRect.left) -
        miniaturasContainer.value.offsetWidth / 2 +
        miniaturaSelecionada.offsetWidth / 2,
      behavior: "smooth",
    });
  }
};

const indexImagemSelecionada = ref(0);
const corSelecionada = ref(route.query.cor || "");
const tamanhoSelecionado = ref(route.query.tamanho || "");
const quantidade = ref(1);

const selecionarCor = (cor, index) => {
  corSelecionada.value = cor;
  indexImagemSelecionada.value = index;
  atualizarURL();
};

const alterarQuantidade = (valor) => {
  if (quantidade.value + valor >= 1) {
    quantidade.value += valor;
  }
};
const adicionarAoCarrinho = () => {
  console.log("Produto adicionado ao carrinho:", {
    cor: corSelecionada.value,
    tamanho: tamanhoSelecionado.value,
    quantidade: quantidade.value,
  });
};

const selecionarTamanho = (tamanho) => {
  tamanhoSelecionado.value = tamanho;
  atualizarURL();
};

const atualizarURL = () => {
  router.replace({
    path: route.path,
    query: {
      cor: corSelecionada.value,
      tamanho: tamanhoSelecionado.value,
    },
  });
};

watch(indexImagemSelecionada, async () => {
  await nextTick();
  scrollToMiniatura();
});

const selecionarImagem = (index) => {
  indexImagemSelecionada.value = index;
};

const miniaturasContainer = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const iniciarArraste = (event) => {
  isDragging.value = true;
  startX.value = event.pageX - miniaturasContainer.value.offsetLeft;
  scrollLeft.value = miniaturasContainer.value.scrollLeft;
};

const arrastar = (event) => {
  if (!isDragging.value) return;
  event.preventDefault();
  const x = event.pageX - miniaturasContainer.value.offsetLeft;
  const walk = (x - startX.value) * 1.5;
  miniaturasContainer.value.scrollLeft = scrollLeft.value - walk;
};

const pararArraste = () => {
  isDragging.value = false;
};
</script>

<style scoped>
.container {
  padding: 20px;
  margin-top: 210px;
}
.img-detalhe {
  max-width: 550px;
  max-height: 550px;
}

.produto-imagem {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 550px;
}

.produto-infor {
  max-width: 550px;
}
.titulo {
  font-size: 34px;
  font-weight: 400;
  line-height: 1.4;
  max-width: 450px;
}

.tamanho-button {
  margin-top: 20px;
}
.preco {
  margin-top: 20px;
  font-size: 28px;
  font-weight: 400;
}

.titulo-infor {
  font-size: 18px;
}
.descricao {
  margin-top: 20px;
  font-size: 16px;
  color: gray;
}

.produto {
  margin-top: 30px;
}

/* Contêiner das miniaturas */
.miniaturas-container {
  overflow-x: auto;
  white-space: nowrap;
  cursor: grab;
  padding: 10px 0;
  display: flex;
  width: 100%;
  max-width: 500px;
  gap: 10px;
  user-select: none;
  cursor: grab;
}

/* Oculta a barra de rolagem */
.miniaturas-container::-webkit-scrollbar {
  display: none;
}

/* Miniaturas */
.miniaturas {
  display: flex;
  gap: 15px;
}

.miniatura {
  width: 85px;
  height: 85px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s ease-in-out;
  padding: 5px;
}

.miniatura-ativa {
  border: 1px solid rgb(0, 0, 0) !important;
  opacity: 0.8;
}

.miniaturas-container:active {
  cursor: grabbing;
}


.cor-selecionada {
  margin-top: 20px;
}


.button-info {
  font-size: 17px;
  padding: 10px;
  margin: 5px;
  margin-top: 20px;
}
.btn-ativo {
  font-weight: bold;
  background-color: #f7d62f;
}

.tamanho-selecionado {
  margin-top: 20px;
}

.v-btn {
  margin: 5px;
}

.tamanho-selecionado,
.quantidade-selecionada {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantidade {
  font-size: 18px;
  font-weight: bold;
}



.quantidade-container {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}

.finalizar-compra {
  flex: 1;
}

.adicionar-carrinho {
  background-color: #f7d62f;
  width: 100%;

}

.container-quantidade-carrinho {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
  background-color: white;
}

.quantidade-botao {
  font-size: 30px;
  padding: 5px 20px;
  cursor: pointer;
  user-select: none;
}

.quantidade {
  padding: 8px 16px;
  min-width: 40px;
  text-align: center;
}

.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}


p ,v-btn{
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
