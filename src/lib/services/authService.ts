import { supabase } from "@/lib/supabaseClient";
import { Auth } from "@/interface/auth.interfase";

const loginUser = async (authUser: Auth) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authUser.email,
    password: authUser.password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export { loginUser };
