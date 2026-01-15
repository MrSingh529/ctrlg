import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";
import { apiUrl } from "@/lib/api";

type SubscriberInput = z.infer<typeof api.subscribers.create.input>;

export function useCreateSubscriber() {
  return useMutation({
    mutationFn: async (data: SubscriberInput) => {
      const res = await fetch(apiUrl(api.subscribers.create.path), {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        
        if (res.status === 400) {
          const error = api.subscribers.create.responses[400].parse(errorData);
          throw new Error(error.message || "Invalid email address");
        }
        if (res.status === 409) {
          const error = api.subscribers.create.responses[409].parse(errorData);
          throw new Error(error.message || "Email already subscribed");
        }
        
        throw new Error("Failed to subscribe");
      }
      
      return api.subscribers.create.responses[201].parse(await res.json());
    },
  });
}