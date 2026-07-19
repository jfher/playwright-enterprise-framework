import type { Address } from "./Address";

export interface ShippingInfo {
    address: Address;
    method: "flatrate" | "freeshipping" | "tablerate";
}

export interface CheckoutInfo {
    shipping: ShippingInfo;
    paymentMethod: "checkmo" | "cashondelivery";
    email?: string;
}
