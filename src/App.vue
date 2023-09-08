<template>
  <v-app>
    <AppBar />
    <v-container>
      <v-responsive>
        <div v-if="!isAuthenticated">
          <form @submit.prevent="login" class="login-form">
            <v-text-field
              outlined
              label="Username"
              v-model="username"
              prepend-icon="mdi-account"
              type="text"
              :disabled="loading"
            />
            <v-text-field
              outlined
              label="Password"
              v-model="password"
              prepend-icon="mdi-lock"
              type="password"
              :disabled="loading"
            />
            <v-btn type="submit" color="primary" :loading="loading">
              Login
            </v-btn>
          </form>
          <v-chip
            v-if="invalidCredentials"
            color="error"
            prepend-icon="mdi-alert-circle"
            variant="text"
          >
            Invalid credentials
          </v-chip>
          <v-overlay
            v-model="loading"
            absolute
            class="connectingOverlay"
          >
            <v-progress-circular
              indeterminate
              size="64"
              color="primary"
            ></v-progress-circular>
          </v-overlay>

          <v-text-field
            class="camera-server-input"
            outlined
            label="Camera Server"
            v-model="cameraServer"
            prepend-icon="mdi-server"
            type="text"
            :disabled="loading"
          />
        </div>
        <CameraSelection v-else />
      </v-responsive>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRootStore } from "@/stores";
import { storeToRefs } from "pinia";
import AppBar from "@/components/AppBar.vue";
import CameraSelection from "@/views/CameraSelection.vue";

export default {
  name: "App",
  components: { CameraSelection, AppBar },
  setup() {
    const username = ref("");
    const password = ref("");
    const loading = ref(false);

    const store = useRootStore();
    const { isAuthenticated, invalidCredentials, cameraServer } = storeToRefs(store);

    async function login() {
      loading.value = true;
      await store.login(username.value, password.value);
      loading.value = false;
    }

    onMounted(() => {
      store.verifyToken();
    });

    return {
      login,
      username,
      password,
      loading,
      isAuthenticated,
      invalidCredentials,
      cameraServer,
    };
  },
};
</script>

<style scoped lang="scss">
.camera-server-input {
  margin: auto;
  width: 300px;
  margin-top: 30px;
}
.connectingOverlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  .v-text-field {
    width: 350px;
  }
}
</style>
