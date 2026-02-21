import { addEvent, getAllEvents } from "@/lib/actions/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllEvents() {
  const result = useQuery({
    queryFn: getAllEvents,
    queryKey: ["getAllEvents"],
  });
  return result;
}

export function useAddEvent() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: addEvent,
    mutationKey: ["addEvent"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getAllEvents"],
      });
    },
    onError(error) {
      console.error(error);
    },
  });
  return result;
}
