"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { emailMutation } from "@/services/api/email.mutation";
import { useToast } from "@/lib/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese un correo válido",
  }),
  subject: z.string().min(2, {
    message: "Por favor ingrese el asunto del mensaje",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres",
  }),
});

export function FormContact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await emailMutation({
        email: values.email,
        subject: values.subject,
        message: values.message,
      });

      form.reset();

      toast({
        title: "¡Mensaje enviado!",
        description: "Tu mensaje ha sido enviado exitosamente. Nos contactaremos pronto.",
      });
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast({
        variant: "destructive",
        title: "Error de envío",
        description: "No se pudo enviar tu mensaje. Por favor intenta de nuevo.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Correo Electrónico
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="correo@ejemplo.com" 
                  className="bg-zinc-950/60 border-zinc-800/80 text-white placeholder-zinc-600 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 rounded-xl transition-all duration-200"
                  disabled={isSubmitting}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Asunto / Nombre
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Alianzas, patrocinios, sugerencias..." 
                  className="bg-zinc-950/60 border-zinc-800/80 text-white placeholder-zinc-600 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 rounded-xl transition-all duration-200"
                  disabled={isSubmitting}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Mensaje
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe aquí en qué te podemos colaborar..."
                  className="bg-zinc-950/60 border-zinc-800/80 text-white placeholder-zinc-600 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 rounded-xl min-h-[140px] resize-none transition-all duration-200"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={!isValid || isSubmitting}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar Mensaje
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
