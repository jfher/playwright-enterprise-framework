import { faker } from "@faker-js/faker";
import type { User } from "@models";

export class UserFactory {
    static random(): User {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: "Password123!"
        };

    }

}