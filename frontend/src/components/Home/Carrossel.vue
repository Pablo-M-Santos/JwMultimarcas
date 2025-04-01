<template>
  <v-carousel
    height="700"
    show-arrows="hover"
    cycle
    hide-delimiter-background
    style="margin-top: 206px;"
  >
    <v-carousel-item
      v-for="(imagem, indice) in imagens"
      :key="indice"
    >
      <a
        :href="imagem.url"
        style="display: block; height: 100%;"
      >
        <v-img
          :src="imagem.src"
          alt="Imagem do slide"
          height="100%"
          cover
        />
      </a>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from "vue";
import img1 from "@/assets/imagem1.png";
import img2 from "@/assets/imagem2.png";
import img3 from "@/assets/imagem3.png";
import img4 from "@/assets/imagem4.png";
import img5 from "@/assets/imagem5.png";
import img6 from "@/assets/imagem6.png";

const imagens = ref([
  { src: img1, url: "" },
  { src: img2, url: "" },
  { src: img3, url: "" },
  { src: img4, url: "" },
  { src: img5, url: "" },
  { src: img6, url: "" }
]);
</script>
