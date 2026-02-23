import {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventDetails,
} from "@/lib/actions/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllEvents() {
  const result = useQuery({
    queryFn: getAllEvents,
    queryKey: ["getAllEvents"],
  });
  return result;
}

export function useGetEventDetails(eventId: string) {
  const result = useQuery({
    queryFn: () => getEventDetails(eventId),
    queryKey: ["getEventDetails"],
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
      queryClient.invalidateQueries({
        queryKey: ["getEventDetails"],
      });
    },
    onError(error) {
      console.error(error);
    },
  });
  return result;
}

export function useEditEvent() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: editEvent,
    mutationKey: ["editEvent"],
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

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: deleteEvent,
    mutationKey: ["deleteEvent"],
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
