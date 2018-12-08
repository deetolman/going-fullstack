<template>
    <li>
        <RouterLink :to="`/movie/${movie.name}`">{{movie.name}}</RouterLink>
        {{movie.name}}
    </li>
</template>

<script>
export default {
  props: {
    movie: null
  },
};
</script>

<style>

</style>
