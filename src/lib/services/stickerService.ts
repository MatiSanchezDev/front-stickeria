import { supabase, createAuthSupabase } from "@/lib/supabaseClient";
import { StickerSchema } from "@/lib/validations/sticker";
import { Sticker, StickerInput } from "@/interface/sticker.interface";

const getClient = (token?: string) =>
  token ? createAuthSupabase(token) : supabase;

const getItemsServices = async (page: number, limit: number, token?: string) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await getClient(token)
    .from("stickers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    success: true,
    data,
    page,
    limit,
    total: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  };
};

const getItemServices = async (id: number, token?: string) => {
  const { data, error } = await getClient(token)
    .from("stickers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const createItemServices = async (sticker: StickerInput, token?: string) => {
  const validated = StickerSchema.parse(sticker);
  const { data, error } = await getClient(token)
    .from("stickers")
    .insert([validated])
    .select();
  if (error) throw new Error(error.message);
  return data;
};

const updateItemServices = async (id: number, update: Partial<Sticker>, token?: string) => {
  const validated = StickerSchema.parse(update);
  const { data, error } = await getClient(token)
    .from("stickers")
    .update(validated)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

const deleteItemServices = async (id: number, token?: string) => {
  const { data, error } = await getClient(token)
    .from("stickers")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export {
  getItemsServices,
  getItemServices,
  createItemServices,
  updateItemServices,
  deleteItemServices,
};
