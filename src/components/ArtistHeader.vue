<template>
    <div class="col-lg-2">
        <img :src="artist.photo" :alt="artist.prenom+' '+artist.nom" class="img-thumbnail">
        <span class="badge badge-secondary mr-2 mt-1" v-for="tag in tags" :key="tag">
            {{ tag }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'ArtistHeader',
    props: {
        artist: Object,
        tags: Array
    }
};
</script>
