import { createStore } from "vuex";
import axios from 'axios';

const store = createStore({
    state: {
        artists: [],
        query: '',
        sortOrder: 'nameAsc',
    },
    getters: {
        getArtists(state) {
            return state.artists;
        },
        filterArtists(state) {
            let filtered = state.artists.filter(artist =>
                artist.nom.toLowerCase().includes(state.query.toLowerCase())
            );
            return filtered;
        }
    },
    mutations: {
        setArtists(state, artists) {
            if (!artists) {
                artists = [];
            }
            state.artists = artists;
        },
        setQuery(state, query) {
            state.query = query;
        },
        setSortOrder(state, order) {
            state.sortOrder = order;
            this.commit('sortArtists');
        },
        setTotalEcoutes(state) {
            state.artists.forEach(artist => {
                artist.totalEcoutes = artist.albums.reduce((sum, album) => {
                    return sum + album.musiques.reduce((subSum, musique) => subSum + musique.nombreEcoutes, 0);
                }, 0);
            });
        },
        sortArtists(state) {
            const order = state.sortOrder;
            switch (order) {
                case 'nameAsc':
                    state.artists.sort((a, b) => a.nom.localeCompare(b.nom));
                    break;
                case 'nameDesc':
                    state.artists.sort((a, b) => b.nom.localeCompare(a.nom));
                    break;
                case 'ageAsc':
                    state.artists.sort((a, b) => a.age - b.age);
                    break;
                case 'ageDesc':
                    state.artists.sort((a, b) => b.age - a.age);
                    break;
                case 'countAsc':
                    state.artists.sort((a, b) => a.totalEcoutes - b.totalEcoutes);
                    break;
                case 'countDesc':
                    state.artists.sort((a, b) => b.totalEcoutes - a.totalEcoutes);
                    break;
                default:
                    break;
            }
        }
    },
    actions: {
        fetchArtists({ commit }) {
            axios.get('http://localhost:8085/artistes.json')
                .then(response => {
                    commit('setArtists', response.data);
                    commit('setTotalEcoutes');
                    commit('sortArtists');
                })
                .catch(error => console.log("Erreur lors de la récupération des artistes:", error));
        }
    },
    strict: true
});

export default store;
