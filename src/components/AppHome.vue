<template>
  <!--  Ajouter les Filtres dans la navigation -->
  <!--  et les garder dans le store pour les conserver lors de la navigation-->
  <TheNavigationForHome></TheNavigationForHome>

  <!--  Prendre en compte les filtres pour afficher seulement les artistes correspondants à la recherche-->
  <div class="row" v-if="filteredArtists && filteredArtists.length">
  <!--  Ajouter les informations de nombre d'écoute-->
    <ArtistCardForHome v-for="artist in filteredArtists" :artist="artist" :key="artist._id"></ArtistCardForHome>
  </div>
  <div class="alert alert-secondary" role="alert" v-else>
    Aucun artiste ne correspond à vos critères...
  </div>
</template>

<script>
import TheNavigationForHome from './TheNavigationForHome.vue'
import ArtistCardForHome from './ArtistCardForHome.vue'

export default {
  name: "Home",
  components: {
    TheNavigationForHome,
    ArtistCardForHome
  },
    computed: {
        filteredArtists() {
            return this.$store.getters.filterArtists;
        }
    },
  mounted() {
      this.$store.dispatch('fetchArtists');
  }
};
</script>

<style scoped>

</style>
