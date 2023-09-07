<template>
  <div v-if="!selectedCamera">
    <v-row justify="center">
      <v-card
        v-for="camera in cameras"
        :key="camera.name"
        v-ripple
        hover
        @click="selectedCamera = camera"
        class="ma-2"
      >
        <v-card-title>{{ camera.name }}</v-card-title>
        <v-card-text>
          <v-img
            :src="camera.thumbnail"
            :width="400"
            aspect-ratio="16/9"
            cover
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
        </v-card-text>
      </v-card>
    </v-row>
    <v-overlay v-model="loading" absolute class="connectingOverlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
  <Camera
    v-else
    :key="selectedCamera.id"
    :selectedCamera="selectedCamera"
    @close="selectedCamera = null"
  />
</template>

<script>
import { ref, onMounted, shallowRef } from "vue";
import Camera from "./Camera.vue";
import { get } from '@/helpers/cameraService';
import { authService } from "@/helpers/authService";

export default {
  name: "CameraSelection",
  components: { Camera },
  setup() {
    const cameras = shallowRef([]);
    const loading = ref(false);
    const selectedCamera = shallowRef(null);


    onMounted(async () => {
      loading.value = true;
      const resp = await get('/cameras');
      cameras.value = resp.map(cam => ({
        ...cam,
        thumbnail: `${import.meta.env.VITE_APP_API}/thumbnail?cameraId=${cam.id}&token=${authService.accessToken}`,
      }));
      loading.value = false;
    });

    return {
      loading,
      cameras,
      selectedCamera,
    };
  },
};
</script>

<style scoped lang="scss">
.connectingOverlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
