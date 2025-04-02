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
            height="400"
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
          <p class="descricao">
            {{ camisa.descricao }}
          </p>
          <div class="cor-selecionada">
            <p>COR: {{ corSelecionada }}</p>
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
            <p>TAMANHO: {{ tamanhoSelecionado }}</p>
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

          <div class="d-flex align-center">
            <p class="mr-2">
              QUANTIDADE:
            </p>
            <v-btn
              :disabled="quantidade <= 1"
              class="mx-2"
              @click="alterarQuantidade(-1)"
            >
              -
            </v-btn>
            <span class="quantidade">{{ quantidade }}</span>
            <v-btn
              class="mx-2"
              @click="alterarQuantidade(1)"
            >
              +
            </v-btn>
          </div>

          <v-btn
            color="primary"
            class="mt-2"
            @click="adicionarAoCarrinho"
          >
            Adicionar ao Carrinho
          </v-btn>
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
    preco: "R$ 79,90",
  },
  {
    slug: "camisa-casual",
    img: [
      new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
    ],
    nome: "Camisa Casual",
    preco: "R$ 79,90",
  },
  {
    slug: "camisa-social",
    img: [
      new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
    ],
    nome: "Camisa Social",
    preco: "R$ 79,90",
  },
  {
    slug: "camisa-esportiva",
    img: [
      new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
      new URL("../../assets/camisas/camisa4.png", import.meta.url).href,
    ],
    cor: ["cinza", "verde", "vermleho", "azul"],
    nome: "Camisa Esportiva",
    tamanhos: ["P", "M", "G", "GG"],
    preco: "R$ 79,90",
  },
];

const camisa = computed(() =>
  camisas.find((c) => c.slug === route.params.slug)
);

// Move as miniaturas enquanto arrasta
const scrollToMiniatura = () => {
  if (!miniaturasContainer.value) return;
  const miniaturas = miniaturasContainer.value.querySelectorAll(".miniatura");
  if (miniaturas[indexImagemSelecionada.value]) {
    miniaturasContainer.value.scrollLeft =
      miniaturas[indexImagemSelecionada.value].offsetLeft -
      miniaturasContainer.value.offsetWidth / 1 +
      miniaturas[indexImagemSelecionada.value].offsetWidth / 5;
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
  max-width: 500px;
  max-height: 500px;
  background-color: gray;
}

.produto-imagem {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
}

.produto-infor {
  background-color: rgb(90, 90, 90);
}
.titulo {
  font-size: 24px;
  font-weight: bold;
}
.preco {
  font-size: 20px;
  color: green;
  font-weight: bold;
}
.descricao {
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
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s ease-in-out;
  padding: 5px;
}

.miniatura:hover {
  border: 2px solid #000;
}

.miniatura-ativa {
  border: 3px solid rgb(0, 0, 0) !important;
  opacity: 0.8;
}

.miniaturas-container:active {
  cursor: grabbing;
}

/* Estilo dos botões de cor */
.cor-selecionada {
  margin-top: 20px;
}

.v-btn {
  margin: 5px;
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

.btn-ativo {
  font-weight: bold;
  background-color: #f7d62f;
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

p ,v-btn{
  display: flex;
  flex-direction: column;
  align-items: start;
}

.fundo-cinza {
  background-color: gray;

}
</style>
