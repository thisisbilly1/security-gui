<template>
  <div class="activity-container">
    <v-card
      v-for="(activity, i) in activities"
      :key="i"
    >
      <v-card-title>
        {{ activity.time }}
      </v-card-title>
      <v-card-text>
        <!-- <v-img :src="activity.image" /> -->
        <ExpandableImage :src="activity.image" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { authService } from "@/helpers/authService";
import { toRefs, onMounted, shallowRef } from "vue";
import { get } from "@/helpers/cameraService";
import ExpandableImage from '../components/ExpandableImage.vue';

export default {
  name: "RecentActivities",
  components: { ExpandableImage },
  props: {
    selectedCamera: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const activities = shallowRef([]);
    const { selectedCamera } = toRefs(props);

    onMounted(async () => {
      const resp = await get(`/activities?cameraId=${selectedCamera.value.id}&token=${authService.accessToken}`);
      activities.value = resp.activities.map(activity => ({
        time: new Date(activity).toLocaleString(),
        image: `/image?cameraId=${selectedCamera.value.id}&activityId=${activity}`,
      }));
    });

    
    return {
      activities,
    };
  },
}
</script>

<style scoped>
.activity-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}
</style>