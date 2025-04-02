<template>
  <div>
    <div class="titulo">
      <h2>Em Alta na Loja</h2>
      <svg-icon
        type="mdi"
        :path="mdiTrendingUp"
        class="icon"
      />
    </div>
    <v-container class="pa-10">
      <v-row justify="center">
        <!-- Card 1 -->
        <v-col
          v-for="(camisa, index) in camisas"
          :key="index"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            class="card mx-auto d-flex flex-column align-left text-left"
            style="flex: 1; max-width: 350px"
            @click="$router.push(`/camisa/${camisa.slug}`)"
          >
            <v-img
              :src="camisa.img"
              class="img-card"
              cover
            />

            <v-card-text class="card-text">
              <h3 class="text-h6 font-weight-bold">
                {{ camisa.nome }}
              </h3>
              <p class="text-subtitle1 font-weight-medium text-green">
                {{ camisa.preco }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrendingUp } from "@mdi/js";

const camisas = [
  {
    slug: "camisa-estilosa",
    img: new URL("../../assets/camisas/camisa1.png", import.meta.url).href,
    nome: "Camisa Estilosa",
    preco: "R$ 79,90",
  },
  {
    slug: "camisa-casual",
    img: new URL("../../assets/camisas/camisa2.png", import.meta.url).href,
    nome: "Camisa Casual",
    preco: "R$ 79,90",
  },
  {
    slug: "camisa-social",
    img: new URL("../../assets/camisas/camisa3.png", import.meta.url).href,
    nome: "Camisa Social",
    preco: "R$ 79,90",
  },
  {
    slug: "camisa-classica-vasco",
    img: new URL("../../assets/camisas/Vasco/vasco1.png", import.meta.url).href,
    nome: "Camisa Classica do Vasco",
    preco: "R$ 79,90",
  },
];
</script>

<style scoped>
.titulo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
}

.titulo h2 {
  font-size: 30px;
  font-weight: bold;
}

.icon {
  width: 39px;
  height: auto;
  color: black;
  cursor: pointer;
}

.container-card {
  margin: 6px 21px 22px 21px;
}

.img-card {
  width: 100%;
  max-width: 257px;
  aspect-ratio: 257/284;
  object-fit: cover;
}

.card {
  border-radius: 18px;
  max-width: 350px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-text {
  width: 100%;
  text-align: left;
  padding-left: 30px;
}
</style>
