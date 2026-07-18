import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bicmas.academy",
  appName: "BICMAS LEARN",
  webDir: "dist",
  // Let OneSignal own iOS push registration (avoids APNs delegate conflicts).
  ios: {
    handleApplicationNotifications: false,
  },
};

export default config;
