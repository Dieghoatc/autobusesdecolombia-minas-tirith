"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";


import { useRouter } from 'next/navigation'
import "./login.css";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});


const API_URL = process.env.NEXT_PUBLIC_ABC_API;

export default function Login() {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      alert('Usuario o contraseña incorrectos')
    }
    form.reset();
  }

  return (
    <section className="login-container">
      <div className="login-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>Ingresa tu corro</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>Ingresa tu contraseña</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Ingresar</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
