"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  emailMutation,
  PostMessage,
} from "@/services/api/email.mutation";
import { useToast } from "@/lib/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Ingrese un correo valido",
  }),
  subject: z.string().min(2, {
    message: "Ingrese un nombre",
  }),
  message: z.string().min(10, {
    message: "Ingrese un mensaje",
  }),
});

export function FormContact() {
  const { toast } = useToast();

  const [message, setMessage] = useState<PostMessage>({
    email: "",
    subject: "",
    message: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setMessage({
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
    form.reset();

    toast({
      description: "Tu mensaje ha sido enviado.",
    });
  }

  useEffect(() => {
    emailMutation(message);
  }, [message]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto</FormLabel>
              <FormControl>
                <Input placeholder="Autobuses de colombia" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe tu mensaje."
                  id="message"
                  {...field}
                />
              </FormControl>
              <FormDescription>Gracias por contactarnos.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Enviar
        </Button>
      </form>
    </Form>
  );
}
