<template>
  <div>
    <h2>Video</h2>
    <v-card>
      <v-card-title class="title">
        <span class="headline">{{ selectedCamera.name }}</span>
        <v-spacer></v-spacer>
        <v-icon @click="$emit('close')">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="video-container">
        <v-img
          ref="video"
          :src="videoSrc"
          aspect-ratio="16/9"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-icon class="fullscreen-icon" @click="toggleFullScreen">
          mdi-fullscreen
        </v-icon>
      </v-card-text>
    </v-card>
    <v-divider class="mt-2"></v-divider>
    <v-btn @click="toggleNightMode" color="primary">toggle night mode</v-btn>
    <h2>Recent activities</h2>
    <!-- <RecentActivities :selectedCamera="selectedCamera"/> -->
    <v-card></v-card>
  </div>
</template>

<script>
import { toRefs, ref, onMounted } from "vue";
import RecentActivities from "./RecentActivities.vue";
import { authService } from "@/helpers/authService";
import { post } from "@/helpers/cameraService";

export default {
  name: "Camera",
  components: { RecentActivities },
  props: {
    selectedCamera: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const video = ref(null);
    const { selectedCamera } = toRefs(props);

    const videoSrc = `/video?cameraId=${selectedCamera.value.id}&token=${authService.accessToken}`;
    
    function toggleFullScreen() {
      video.value.$el.requestFullscreen();
    }

    function toggleNightMode() {
      post(`/nightMode?cameraId=${selectedCamera.value.id}/`)
    }

    return {
      video,
      videoSrc,
      toggleFullScreen,
      selectedCamera,
      toggleNightMode,
    };
  },
};
</script>

<style scoped lang="scss">
.video-container {
  position: relative;

  &:hover {
    .fullscreen-icon {
      display: block;
    }
  }

  .fullscreen-icon {
    display: none;
    position: absolute;
    top: calc(100% - 45px);
    left: calc(100% - 40px);
    z-index: 100;
    color: white;
    cursor: pointer;
  }
}
.video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.title {
  display: flex;
  align-items: center;
  min-width: 300px;
}
</style>