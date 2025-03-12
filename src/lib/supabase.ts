import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export const supabaseAdmin = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_KEY
);


//A partir de acá la autenticación con los roles
export async function getUserRole(userId: string) {
  const { data: userRole, error: userRoleError } = await supabase
    .from("customers")
    .select("role") // Seleccionar la columna "role"
    .eq("user_id", userId)
    .single();

  if (userRoleError) {
    console.error("Error al obtener el rol del usuario:", userRoleError);
    return null;
  }

  return userRole?.role; // Devolver el valor de la columna "role"
}
