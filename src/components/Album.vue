<template>
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
</template>

<script>
export default {
    name: 'Album',
    props: {
        album: Object
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
        }
    }
};
</script>
