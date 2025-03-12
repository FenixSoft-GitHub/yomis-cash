// src/middleware/auth.js
import { supabase, getUserRole } from "@/lib/supabase";

export async function isAuthenticated({ cookies, redirect }, requiredRoles = []) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  if (requiredRoles.length > 0) {
    const role = await getUserRole(user.id);

    if (!role || !requiredRoles.includes(role)) {
      return redirect("/forbidden"); // Página de acceso denegado
    }
  }

  return; // El usuario está autenticado y tiene el rol requerido
}

export async function protectPage(Astro) {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) {
    Astro.redirect("/signin");
  }
}