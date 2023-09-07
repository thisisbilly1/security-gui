<template>
  <div>
    <div class="image-container">
      <v-icon class="fullscreen-icon">mdi-fullscreen</v-icon>
      <v-img v-bind="$attrs" @click="expand" ref="image"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExpandableImage',
  setup() {
    const image = ref(null)

    function expand() {
      console.log(image.value);
      // request full screen
      image.value.$el.requestFullscreen()
    }

    return {
      image,
      expand,
    }
  }
}
</script>

<style scoped lang="scss">
.image-container {
  position: relative;

  &:hover {
    .fullscreen-icon {
      display: block;
    }
  }

  .fullscreen-icon {
    display: none;
    position: absolute;
    top: calc(100% - 25px);
    left: calc(100% - 20px);
    z-index: 100;
    color: white;
    cursor: pointer;
  }
}
</style>