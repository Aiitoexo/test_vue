<template>
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
                     Afficher plus de titres
                </a>
            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'PopularTracks',
    props: {
        titresPopulaires: Array
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
        showMoreSongs() {
            this.$emit('showMoreSongs');
        }
    }
};
</script>
