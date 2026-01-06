import { useEffect } from "react";
import { messaging, requestForToken } from "../lib/firebase";
import { onMessage } from "firebase/messaging";
import { registerDevice } from "../lib/api/notifications/registerDevice";
import { useAuthStore } from "../store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeviceId } from "../lib/utils";

export const useNotifications = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerDevice,
    onSuccess: () => {
      console.log("Device registered for notifications");
    },
    onError: (error) => {
      console.error("Error registering device:", error);
    },
  });

  const setupNotifications = async () => {
    if (Notification.permission === "denied") {
      console.log("Notification permission denied previously.");
      return;
    }

    try {
      console.log("Requesting notification permission...");
      const permission = await Notification.requestPermission();
      console.log("Notification permission result:", permission);

      if (permission === "granted") {
        console.log("Getting FCM token...");
        const token = await requestForToken();
        console.log("FCM Token retrieved:", token);

        if (token && user) {
          const storageKey = `fcm_registered_${user.id || user.email}`;
          const lastRegisteredToken = localStorage.getItem(storageKey);

          if (lastRegisteredToken === token) {
            console.log(
              "Device already registered for this user with this token."
            );
            return;
          }

          console.log("Registering device for user:", user.id || user.name);
          mutation.mutate(
            {
              device_type: "web",
              device_token: getDeviceId(),
              device_name: window.navigator.userAgent,
              app_id: "user",
              notifiable_type: "firebase",
              notifiable_id: token,
              enabled: true,
            },
            {
              onSuccess: () => {
                localStorage.setItem(storageKey, token);
              },
            }
          );
        }
      }
    } catch (err) {
      console.error("Failed to setup notifications:", err);
    }
  };

  useEffect(() => {
    // Request permission and setup token on mount (as soon as they enter the website)
    setupNotifications();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      // Invalidate notifications query to refresh the list in the header
      queryClient.invalidateQueries({ queryKey: ["broadcastNotifications"] });
    });

    return () => {
      unsubscribe();
    };
  }, [user, queryClient]);

  return { setupNotifications };
};
