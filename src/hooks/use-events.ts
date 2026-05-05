import {
  addEvent,
  bookEvent,
  cancelEvent,
  checkBookingAvailability,
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

export function useCheckBookingAvailability(eventId: string, options = {}) {
  const result = useQuery({
    queryFn: () => checkBookingAvailability(eventId),
    queryKey: [eventId + "checkBookingAvailability"],
    ...options,
  });
  return result;
}

export function useBookEvent(
  sessionId: string,
  eventId: string,
  clerkId: string,
) {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: () => bookEvent(sessionId, eventId, clerkId),
    mutationKey: ["bookEvent"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEventDetails"] });
      queryClient.invalidateQueries({
        queryKey: [eventId + "checkBookingAvailability"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return result;
}

export function useCancelEventBooking(
  eventId: string,
  clerkId: string,
  bookedEventId: string,
) {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: () => cancelEvent(eventId, clerkId, bookedEventId),
    mutationKey: ["cancelEvent"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEventDetails"] });
      queryClient.invalidateQueries({
        queryKey: [eventId + "checkBookingAvailability"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return result;
}
