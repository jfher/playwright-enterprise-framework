import { test, expect } from "@fixtures";

test("Dashboard", async ({ authenticatedPage }) => {

    await authenticatedPage.goto("/dashboard");

    await expect(authenticatedPage.getByRole("heading")).toContainText("Dashboard");

});