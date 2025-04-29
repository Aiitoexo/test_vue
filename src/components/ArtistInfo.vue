<template>
    <div class="col-lg-7">
        <h3>
            {{ artist.prenom }} {{ artist.nom }}
            <span class="text-muted">({{ artist.age }} ans)</span>
        </h3>
        <p>
            {{ artist.bio }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'ArtistInfo',
    props: {
        artist: Object
    }
};
</script>
