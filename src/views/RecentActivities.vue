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
    <v-btn v-if="hasMore" color="primary" @click="loadMore">
      Load More
    </v-btn>
  </div>
</template>

<script>
import { toRefs, onMounted, computed, ref } from "vue";
import { useRootStore } from "@/stores";
import { storeToRefs } from "pinia";
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
    const currentPage = ref(0);
    const { selectedCamera } = toRefs(props);
    const store = useRootStore();
    const { activitiesObj } = storeToRefs(store);

    onMounted(() => {
      store.getActivities(selectedCamera.value.id);
    });

    const activities = computed(() => {
      if (!activitiesObj?.value) return [];
      return activitiesObj.value.activities.map(activity => ({
        ...activity,
        time: new Date(activity.time).toLocaleString(),
      }));
    });

    const hasMore = computed(() => {
      if (!activitiesObj?.value) return false;
      return activitiesObj.value.hasMore;
    });

    function loadMore() {
      currentPage.value += 1;
      store.getActivities(selectedCamera.value.id, currentPage.value);
    }

    return {
      activities,
      hasMore,
      loadMore,
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