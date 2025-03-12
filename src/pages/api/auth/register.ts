import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("fullName")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!email || !password) {
    return new Response("Correo electrónico y contraseña obligatorios", {
      status: 400,
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return new Response("Este correo electrónico ya está registrado.", {
        status: 409, // Conflict
      });
    }
    return new Response(error.message, { status: 500 });
  }

  const userId = data.user?.id;

  if (!userId) {
    return new Response("Error al obtener el id del usuario.", {
      status: 500,
    });
  }

  const { error: signinError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signinError) {
    return new Response("Error al iniciar sesión.", {
      status: 500,
    });
  }

  const { error: customerError } = await supabase.from("customers").insert({
    user_id: userId,
    full_name: fullName,
    phone: phone,
    email: email,
    role: "user",
  });

  if (customerError) {
    return new Response(
      "Error al insertar los datos del usuario en la tabla de customer.",
      {
        status: 500,
      }
    );
  }

  return redirect("/signin");
};

// //Con `output: 'hybrid'` configurado:
// export const prerender = false;
// import type { APIRoute } from "astro";
// import { supabase } from "@/lib/supabase";

// export const POST: APIRoute = async ({ request, redirect }) => {
//   const formData = await request.formData();
//   const email = formData.get("email")?.toString();
//   const password = formData.get("password")?.toString();
//   const fullName = formData.get("fullName")?.toString();
//   const phone = formData.get("phone")?.toString();

//   if (!email || !password) {
//     return new Response("Correo electrónico y contraseña obligatorios", {
//       status: 400,
//     });
//   }

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     return new Response(error.message, { status: 500 });
//   }

//   const userId = data.user?.id;

//   if (!userId) {
//     throw new Error("Error al obtener el id del usuario: " + userId);
//   }

//   // Autenticar el usuario
//   const { error: signinError } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (signinError) {
//     throw new Error("Error al iniciar sesión: " + signinError);
//   }

// //Insertar el rol por defecto
// //   const { error: roleError } = await supabase.from("customers").insert({
// //     user_id: userId,
// //     role: "user",
// //   });

// //   if (roleError) {
// //     throw new Error("Error al insertar el rol del usuario: " + roleError);
// //   }

//   //Insertar los datos del usuario en la tabla de customer (clientes)
//   const { error: customerError } = await supabase.from("customers").insert({
//     user_id: userId,
//     full_name: fullName,
//     phone: phone,
//     email: email,
//     role: "user",
//   });

//   if (customerError) {
//     throw new Error(
//       "Error al insertar los datos del usuario en la tabla de customer: " +
//         customerError
//     );
//   }

//   return redirect("/signin");
// };
