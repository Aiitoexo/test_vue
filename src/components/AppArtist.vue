<template>
    <template v-if="artist">
        <div class="row border-bottom mb-4 pb-4">
            <ArtistHeader :artist="artist" :tags="artist.tags" />
            <ArtistInfo :artist="artist" />
            <SimilarArtists :artistsSimilaires="artistsSimilaires" :style-musical="artist.styleMusical"/>
        </div>

        <div class="row mb-4">
            <div class="col-lg-2"></div>
            <div class="col-lg-7">
                <PopularTracks
                    :titresPopulaires="titresPopulaires"
                    @show-more-songs="showMoreSongs"
                />
            </div>
        </div>

        <div v-for="album in sortedAlbums" :key="album._id" class="row mb-4 border-bottom mb-4 pb-4">
            <Album :album="album" />
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
import ArtistHeader from './ArtistHeader.vue';
import ArtistInfo from './ArtistInfo.vue';
import SimilarArtists from './SimilarArtists.vue';
import PopularTracks from './PopularTracks.vue';
import Album from './Album.vue';

export default {
    name: "Artist",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        ArtistHeader,
        ArtistInfo,
        SimilarArtists,
        PopularTracks,
        Album
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

        this.sortedAlbums = this.albums.sort((a, b) => new Date(b.dateSortie) - new Date(a.dateSortie));
    },
    methods: {
        showMoreSongs() {
            this.showAllTitres = true;
            this.titresPopulaires = this.allTitres;
        }
    }
};
</script>
