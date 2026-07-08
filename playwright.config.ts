import { defineConfig } from "@playwright/test";

import { Browsers, Environment, Reporters, Timeouts } from "@config";

export default defineConfig({

    testDir: "./tests",
    timeout: Timeouts.DEFAULT,
    expect: {
        timeout: Timeouts.MEDIUM
    },

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: Reporters as any,

    use: {
        baseURL: Environment.baseUrl,
        headless: Environment.headless,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure"
    },

    projects: [
        Browsers.chromium,
        Browsers.firefox,
        Browsers.webkit
    ]

});