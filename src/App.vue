<script lang="ts">
import { Dashboard, TStyle } from 'vue2-semaphor';
import 'vue2-semaphor/dist/style.css'; // IMPORTANT! Include the CSS file. This is the default style, you can customize it.

const DASHBOARD_ID = 'd_cf007a8b-19bc-46ad-8787-2915445b7b86';
const DASHBOARD_SECRET = 'ds_f32f0b30-b7e1-40f9-ba6a-9804a5b9d635';
const TOKEN_URL = 'https://semaphor.cloud/api/v1/token';

// Define your custom styles here. Refer to the themes and styles section of the doc.
const customStyle: TStyle = {
  default: {
    chart: {
      dataset: {
        backgroundColor: ['red', 'blue', 'green', 'purple'],
        borderColor: ['red', 'blue', 'green', 'purple'],
      },
    },
  },
};

export default {
  components: {
    Dashboard,
  },
  data() {
    return {
      token: null,
      DASHBOARD_ID: DASHBOARD_ID,
      customStyle: customStyle,
    };
  },
  methods: {
    handleSemaphorEvent(event: unknown) {
      console.log('Event:', event);
    },
    async fetchToken() {
      try {
        const response = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dashboardId: DASHBOARD_ID,
            dashboardSecret: DASHBOARD_SECRET,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tkn = await response.json();
        if (tkn?.accessToken) {
          this.token = tkn;
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
  },
  created() {
    this.fetchToken();
  },
};
</script>
<template>
  <div>
    <div v-if="!token">Loading...</div>
    <Dashboard
      v-if="token"
      :token="token"
      :id="DASHBOARD_ID"
      currentTheme="system"
      :customStyle="customStyle"
      :onEvent="handleSemaphorEvent"
    />
  </div>
</template>
