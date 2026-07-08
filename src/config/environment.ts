import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is missing.`);
    }

    return value;
}

export const Environment = {

    baseUrl: getEnv("BASE_URL"),

    headless: getEnv("HEADLESS") === "true"

};