<template>
    <template v-if="artist">
        <div class="row border-bottom mb-4 pb-4">
            <div class="col-lg-2">
                <img :src="artist.photo" :alt="artist.prenom+' '+artist.nom" class="img-thumbnail">
                <span class="badge badge-secondary mr-2 mt-1" v-for="tag in artist.tags" :key="tag">
          {{ tag }}
        </span>
            </div>
            <div class="col-lg-7">
                <h3>
                    {{ artist.prenom }} {{ artist.nom }}
                    <span class="text-muted">({{ artist.age }} ans)</span>
                </h3>
                <p>
                    {{ artist.bio }}
                </p>
            </div>
            <div class="col col-lg-3">
                <div class="list-group">
                    <h5 class="list-group-item list-group-item-primary">{{ artist.styleMusical }}</h5>
                    <template v-if="artistsSimilaires.length">
                        <router-link
                            v-for="artistSimilaire in artistsSimilaires"
                            :to="{ name: 'artist', params: { id: artistSimilaire._id } }"
                            :key="artistSimilaire._id"
                            class="list-group-item"
                        >
                            {{ artistSimilaire.prenom }} {{ artistSimilaire.nom }}
                        </router-link>
                    </template>
                    <template v-else>
                        <a class="list-group-item disabled" href="#">Seul(e) artiste de {{ artist.styleMusical }} connu(e)</a>
                    </template>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-lg-2"></div>
            <div class="col-lg-7">
                <table class="table table-striped">
                    <thead class="thead-light">
                    <tr>
                        <th></th>
                        <th>Titres populaires</th>
                        <th>Durée</th>
                        <th>Écoutes</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="titre in titresPopulaires" :key="titre._id">
                        <td>
                            <img :src="titre.couverture" style="width: 30px;">
                        </td>
                        <td class="align-middle">
                            {{ capitalizeTitle(titre.titre) }}
                        </td>
                        <td class="text-right align-middle">
                            {{ formatDuration(titre.dureeSecondes) }}
                        </td>
                        <td class="text-right align-middle">
                            {{ formatNumber(titre.nombreEcoutes) }}
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="4" class="text-center" v-if="titresPopulaires.length < 10">
                            <a @click="showMoreSongs" href="#" class="text-primary">
                                <fa icon="add"></fa> Afficher plus de titres
                            </a>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div v-for="album in sortedAlbums" :key="album._id" class="row mb-4 border-bottom mb-4 pb-4">
            <div class="col-lg-2">
                <img :src="album.couverture" :alt="album.intitule" class="img-thumbnail">
                <h5>
                    {{ album.intitule }}
                    <span class="text-muted">{{ formatDate(album.dateSortie) }}</span>
                </h5>
            </div>
            <div class="col-lg-7">
                <table class="table">
                    <tbody>
                    <tr v-for="track in album.musiques" :key="track._id">
                        <td class="align-middle">
                            {{ capitalizeTitle(track.titre) }}
                        </td>
                        <td class="text-right align-middle">
                            {{ formatDuration(track.dureeSecondes) }}
                        </td>
                        <td class="text-right align-middle">
                            {{ formatNumber(track.nombreEcoutes) }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </template>

    <div class="d-flex justify-content-center" v-else>
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FontAwesomeIcon from '../plugins/font-awesome';

export default {
    name: "Artist",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        fa: FontAwesomeIcon
    },
    data() {
        return {
            artist: null,
            artistsSimilaires: [],
            titresPopulaires: [],
            allTitres: [],
            albums: [],
            sortedAlbums: [],
            showAllTitres: false
        };
    },
    async mounted() {
        const response = await axios.get('http://localhost:8085/artistes.json');

        this.artist = response.data.find(artist => artist._id === this.id);
        this.artistsSimilaires = response.data.filter(
            artist => artist.styleMusical === this.artist.styleMusical && artist._id !== this.artist._id
        );

        this.allTitres = this.artist.albums.flatMap(album => album.musiques);
        this.titresPopulaires = this.allTitres.slice(0, 5);
        this.albums = this.artist.albums;

        // Trie des albums dans mounted() au lieu d'une computed property
        this.sortedAlbums = this.albums.sort((a, b) => new Date(b.dateSortie) - new Date(a.dateSortie));
    },
    methods: {
        formatNumber(number) {
            return number.toLocaleString();
        },
        formatDuration(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        },
        capitalizeTitle(title) {
            return title.charAt(0).toUpperCase() + title.slice(1);
        },
        formatDate(date) {
            const cleanedDate = date.replace(/\s+/g, '');

            const parsedDate = new Date(cleanedDate);

            const day = parsedDate.getDate().toString().padStart(2, '0');
            const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = parsedDate.getFullYear();

            return `${day}/${month}/${year}`;
        },
        showMoreSongs() {
            this.showAllTitres = true;
            this.titresPopulaires = this.allTitres;
        }
    }
};
</script>

<style scoped>
/* Style to adjust the album cover image size */
img {
    max-width: 100%;
    height: auto;
}
</style>
