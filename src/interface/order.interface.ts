export interface Order {
  id?: number | string;
  created_at: string;
  name: string;
  total_price: number;
  prepaid: boolean;
  delivered: boolean;
  message_client: string;
}

export interface OrderInput {
  name: string;
  total_price: number;
  prepaid: boolean;
  delivered: boolean;
  message_client: string;
}

export type OrderArray = Order[];

export type OrderId = string | number;
