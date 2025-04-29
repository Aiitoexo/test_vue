<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 1rem;">
        <router-link to="/" class="navbar-brand" style="background: transparent; color: black !important;">Artistes</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>

            <form class="form-inline">
                <div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trier</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" @click="setSort('nameAsc')" href="#">Nom (Croissant)</a>
                            <a class="dropdown-item" @click="setSort('nameDesc')" href="#">Nom (Decroissant)</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" @click="setSort('ageAsc')" href="#">Age (Croissant)</a>
                            <a class="dropdown-item" @click="setSort('ageDesc')" href="#">Age (Decroissant)</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" @click="setSort('countAsc')" href="#">Nombre d'écoutes (Croissant)</a>
                            <a class="dropdown-item" @click="setSort('countDesc')" href="#">Nombre d'écoutes (Decroissant)</a>
                        </div>
                    </div>
                    <input class="form-control" type="search" v-model="query" placeholder="Rechercher" aria-label="Rechercher" @input="applyFilter">
                </div>
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    name: "TheNavigationForHome",
    data() {
        return {
            query: ''
        };
    },
    methods: {
        setSort(order) {
            this.$store.commit('setSortOrder', order);
        },
        applyFilter() {
            this.$store.commit('setQuery', this.query);
        }
    }
};
</script>
