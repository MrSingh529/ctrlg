import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

type FormData = z.infer<typeof insertSubscriberSchema>;

export function NewsletterForm() {
  const { toast } = useToast();
  const createSubscriber = useCreateSubscriber();
  
  const form = useForm<FormData>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: FormData) => {
    createSubscriber.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "Thank you for joining. Check your inbox soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  if (createSubscriber.isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">You're on the list!</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex gap-2 max-w-sm">
        <input
          {...form.register("email")}
          type="email"
          placeholder="your@email.com"
          disabled={createSubscriber.isPending}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
        />
        <button
          type="submit"
          disabled={createSubscriber.isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {createSubscriber.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Join <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </div>
      {form.formState.errors.email && (
        <p className="text-xs text-destructive mt-1 font-medium">
          {form.formState.errors.email.message}
        </p>
      )}
    </form>
  );
}
