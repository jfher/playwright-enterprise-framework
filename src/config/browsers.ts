import { devices } from "@playwright/test";

export const Browsers = {
    chromium: {
        name: "chromium",
        use: {
            ...devices["Desktop Chrome"]
        }
    },

    firefox: {
        name: "firefox",
        use: {
            ...devices["Desktop Firefox"]
        }
    },

    webkit: {
        name: "webkit",
        use: {
            ...devices["Desktop Safari"]
        }
    }
};