export interface Order {
  id?: number | string;
  created_at: string;
  name: string;
  total_price: number;
  prepaid: boolean;
  delivered: boolean;
}

export interface OrderInput {
  name: string;
  total_price: number;
  prepaid: boolean;
  delivered: boolean;
}

export type OrderArray = Order[];

export type OrderId = string | number;
