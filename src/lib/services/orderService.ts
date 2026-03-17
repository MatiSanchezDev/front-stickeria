import { supabase, createAuthSupabase } from "@/lib/supabaseClient";
import { OrderSchema } from "@/lib/validations/order";
import { Order, OrderInput } from "@/interface/order.interface";

const getClient = (token?: string) =>
  token ? createAuthSupabase(token) : supabase;

const getOrdersServices = async (page: number, limit: number, token?: string) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await getClient(token)
    .from("orders")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
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

const getOrderServices = async (id: number, token?: string) => {
  const { data, error } = await getClient(token)
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const createOrderServices = async (order: OrderInput, token?: string) => {
  const validated = OrderSchema.parse(order);
  const { data, error } = await getClient(token)
    .from("orders")
    .insert([validated])
    .select();
  if (error) throw new Error(error.message);
  return data;
};

const updateOrderServices = async (id: number, update: Partial<Order>, token?: string) => {
  const validated = OrderSchema.parse(update);
  const { data, error } = await getClient(token)
    .from("orders")
    .update(validated)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

const deleteOrderServices = async (id: number, token?: string) => {
  const { data, error } = await getClient(token)
    .from("orders")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export {
  getOrdersServices,
  getOrderServices,
  createOrderServices,
  updateOrderServices,
  deleteOrderServices,
};
