import { getApiV1BaseUrl } from "@/config/api";
import { getAccessToken } from "@/utils/auth";
import { fetchWithAuthRetry } from "@/utils/fetchWithAuthRetry";

export const getAnnouncements = async () => {
  try {
    const token = getAccessToken();

    if (!token) {
      throw new Error("No access token available");
    }

    const res = await fetchWithAuthRetry(`${getApiV1BaseUrl()}/announcements`);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch announcements: ${res.status} ${res.statusText}`,
      );
    }

    const result = await res.json();

    if (!result || typeof result !== "object") {
      throw new Error("Invalid announcements response format");
    }

    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("getAnnouncements failed", error);
    throw error;
  }
};

export const showAnnouncementNotification = async (message: string) => {
  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted") return;

  try {
    if (
      typeof navigator === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      // Fallback to plain Notifications API if no SW is available
      new Notification("BICMAS LEARN Announcement", {
        body: message,
        icon: "/img/bicmas-logo.png",
        badge: "/img/bicmas-logo.png",
        tag: "bicmas-learn-announcement",
      });
      return;
    }

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      // No active service worker registration
      new Notification("BICMAS LEARN Announcement", {
        body: message,
        icon: "/img/bicmas-logo.png",
        badge: "/img/bicmas-logo.png",
        tag: "bicmas-learn-announcement",
      });
      return;
    }

    await registration.showNotification("BICMAS LEARN Announcement", {
      body: message,
      icon: "/img/bicmas-logo.png",
      badge: "/img/bicmas-logo.png",
      tag: "bicmas-learn-announcement",
    });
  } catch (error) {
    console.error("Failed to show announcement notification", error);
  }
};
