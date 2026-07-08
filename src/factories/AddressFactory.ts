import type { Address } from "@models";

export class AddressFactory {
    static bolivia(): Address {
        return {
            street: "Av. Arce",
            city: "La Paz",
            state: "La Paz",
            postalCode: "0000",
            country: "Bolivia",
            phone: "77777777"
        };
    }
}