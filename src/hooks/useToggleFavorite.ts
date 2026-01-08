import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "../lib/api/toggleFavorite";
import type { Favorite } from "../lib/api/getFavorites";
import type { Plate } from "../lib/api/plates";
import type { Sim } from "../lib/api/sims";
import { useAuthStore } from "../store";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: toggleFavorite,
    onMutate: async (newItem) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData<Favorite[]>([
        "favorites",
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData<Favorite[]>(["favorites"], (old) => {
        if (!old) return [];

        const existingIndex = old.findIndex(
          (fav) =>
            fav.favorable_type === newItem.favorable_type &&
            fav.favorable_id === newItem.favorable_id
        );

        if (existingIndex > -1) {
          // It was a favorite, so we are removing it
          return old.filter((_, index) => index !== existingIndex);
        } else {
          // We are adding it
          // We need the full object to add it optimistically.
          // Since the API call only takes ID, we can't fully reconstruct the list
          // unless we pass the object to the hook.
          // For the "heart" icon state, we just need the presence of the entry.
          // But for the Favorites Page list, we need the `favorable` data.

          // If we don't have the object (because the hook signature is limited),
          // we can at least push a partial object that satisfies the check for "isFavorited".
          // Ideally, we should update the hook signature to accept the object.
          // But for now, let's assume we might lack the full object if we only passed ID.

          // However, to fix "flashing button", strictly, we just need to know it's there.
          // The UI (PlateCard) checks `some(...)`.

          // Let's create a placeholder.
          const newFavorite: any = {
            id: Date.now(), // Temp ID
            user_id: user?.id || 0,
            favorable_type: newItem.favorable_type,
            favorable_id: newItem.favorable_id,
            favorable: (newItem as any).favorableData || {}, // We will need to pass this
          };
          return [...old, newFavorite];
        }
      });

      // Return a context object with the snapshotted value
      return { previousFavorites };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["favorites"], context?.previousFavorites);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
