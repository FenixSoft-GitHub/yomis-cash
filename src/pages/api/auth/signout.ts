// Con `output: 'hybrid'` configurado:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Cerrar sesión en Supabase
  await supabase.auth.signOut();
  
  // Eliminar cookies de autenticación
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/signin");
};
