export interface Order {
  id?: number | string;
  name: string;
  total_price: number;
  prepaid: boolean;
  delivered: boolean;
}

export type OrderArray = Order[];

export type OrderId = string | number;
