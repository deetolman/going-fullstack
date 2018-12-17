<template>
    <section v-if="movie">
      <RouterLink :to="`/movies`">Back</RouterLink>
      <button @click="handleDelete">Delete</button>
      <button @click="handleUpdate">Edit</button>
        <h2>{{movie.name}}</h2>
        <p>
            {{movie.year}}
        </p>
        <p>
            Genre: {{movie.genre}}
        </p>
    </section>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      movie: null
    };
  },
  created() {
    api.getMovie(this.$route.params.id)
      .then(movie => {
        this.movie = movie;
      });
  },
  methods: {
    handleDelete() {
      api.deleteMovie(this.movie.id)
        .then(() => {
          this.$router.push('/movies');
        });
    },
    handleUpdate() {
      api.updateMovie(this.movie.id)
        .then(() => {
          this.$router.push();
        });
    }
  }
};
</script>

<style>

</style>
