<template>
  <div>
    <!-- Primeira NavBar -->
    <v-app-bar
      height="70"
      elevation="0"
    >
      <div class="nav-container d-flex justify-end align-center">
        <div class="social-links d-flex align-center">
          <v-img
            src="../../assets/instagram.png"
            alt="Logo"
            max-height="100%"
            width="20"
            class="mr-1"
          />
          <span>Instagram</span>

          <span class="divider"> | </span>

          <v-img
            src="../../assets/whatsapp.png"
            alt="Logo"
            width="20"
            class="mr-1"
          />
          <span>WhatsApp</span>
        </div>
      </div>
    </v-app-bar>

    <!-- Segunda NavBar -->
    <v-app-bar
      height="96"
      style="background-color: #f7d62f"
      elevation="0"
      class="d-flex justify-center align-center"
    >
      <div
        class="d-flex justify-center align-center"
        style="
          width: 100%;
          max-width: 1440px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 16px;
        "
      >
        <!-- Logo -->
        <div class="logo">
          <v-img
            src="../../assets/logo.png"
            alt="Logo"
          />
        </div>
        <v-spacer />

        <!-- Barra de Pesquisa -->
        <div class="search-container">
          <input
            type="text"
            placeholder="Pesquise seus produtos aqui"
            class="pesquisa"
          >
          <svg-icon
            type="mdi"
            :path="mdiMagnify"
            class="search-icon"
          />
        </div>

        <v-spacer />

        <!-- icones -->
        <div class="navbar-icons">
          <!-- Usuário -->
          <v-menu
            open-on-hover
            offset-y
            transition="slide-y-transition"
            :transition-duration="10"
          >
            <template #activator="{ props }">
              <div
                class="usuario-navbar"
                v-bind="props"
              >
                <svg-icon
                  type="mdi"
                  :path="mdiAccountCircle"
                  class="icon"
                />
                <div class="usuario-text">
                  <span>olá, faça seu login </span>
                  <span>
                    ou cadastre-se
                    <svg-icon
                      type="mdi"
                      :path="mdiArrowDown"
                      class="seta-icon-navbar"
                    />
                  </span>
                </div>
              </div>
            </template>
            <div class="triangle" />
            <v-card class="tooltip-content rounded-xl">
              <div class="tooltip-card">
                <p>
                  Pra ver seus pedidos e ter uma experiência personalizada,
                  acesse sua conta :)
                </p>
                <v-btn
                  block
                  small
                  class="entrar-button"
                >
                  Entrar
                </v-btn>
                <v-btn
                  block
                  small
                  class="cadastrar-button"
                >
                  Cadastrar
                </v-btn>
              </div>
            </v-card>
          </v-menu>

          <!-- Carrinho -->
          <v-badge
            color="black"
            :content="1"
            floating
            class="cursor-pointer"
          >
            <svg-icon
              type="mdi"
              :path="mdiCart"
              class="icon"
            />
          </v-badge>
        </div>
      </div>
    </v-app-bar>

    <!-- Terceira NavBar -->
    <v-app-bar
      height="40"
      elevation="0"
      style="background-color: #f7d62f"
    >
      <v-spacer />
      <v-btn text>
        Novo
      </v-btn>
      <v-btn text>
        Masculino
      </v-btn>
      <v-btn text>
        Feminino
      </v-btn>
      <v-btn text>
        Infantil
      </v-btn>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccountCircle, mdiCart, mdiMagnify, mdiArrowDown } from "@mdi/js";
</script>

<style scoped>
/* Primeira NavBar */
.nav-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
}

.social-links {
  gap: 5px;
  color: #767676;
  font-weight: bold;
  cursor: pointer;
}

.social-links span:hover {
  color: black;
  transition: 0.8s;
  cursor: pointer;
}

.divider {
  padding: 0 8px;
  font-weight: bold;
}

/* Segunda NavBar */
.logo {
  height: auto;
  width: 200px;
  display: flex;
  justify-content: center;
}

/* Barra de Pesquisa */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.pesquisa {
  padding: 0 1.5rem;
  border-radius: 0.75rem;
  width: 600px;
  height: 50px;
  background-color: white;
  color: #767676;
}

.search-icon {
  position: absolute;
  right: 15px;
  width: 24px;
  height: 24px;
  color: black;
  cursor: pointer;
}

.icon {
  width: 32px;
  height: 32px;
  color: black;
  cursor: pointer;
}

.navbar-icons {
  display: flex;
  align-items: center;
  gap: 50px;
}

.usuario-navbar {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 8px;
  cursor: pointer;
}

/* Usuário Tooltip */
.tooltip-content {
  border-radius: 50px;
  position: relative;
  display: inline-block;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 15px;
  top: 30px;
  right: 100px;
  overflow: visible;

}

.tooltip-card {
  width: 208px;
  margin: 26px 30px;
  border-radius: 50px;
}

.tooltip-card p {
  color: rgb(102, 102, 102);
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 18px;
  display: block;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}

.entrar-button {
  border-radius: 8px;
  box-shadow: none;
  font-size: 16px;
  padding: 10px;
  font-weight: 700;
  background: #f7d62f;
  text-align: center;
  margin-bottom: 10px;
  color: rgb(255, 255, 255);
  width: 100%;
  height: 44px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: filter 0.3s;
}

.cadastrar-button {
  border-radius: 8px;
  box-shadow: none;
  font-size: 16px;
  padding: 10px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
  height: 44px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: filter 0.3s;
  color: #f7d62f;
  background: rgb(255, 255, 255);
  border: 2px solid #f7d62f;
}
.usuario-text {
  display: flex;
  flex-direction: column;
  line-height: 18px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.triangle {
  content: "";
  border-bottom: 14px solid rgb(255, 255, 255) !important;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  position: absolute;
  top: 20px;
  left: 100px;
  z-index: 999;
}

.seta-icon-navbar {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
</style>
