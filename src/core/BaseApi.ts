import { APIRequestContext } from "@playwright/test";

/**
 * Base class for Magento 2 REST API clients.
 * Provides typed HTTP methods with authentication header support.
 */
export class BaseApi {

    constructor(
        protected readonly request: APIRequestContext,
        protected readonly baseUrl: string
    ) { }

    protected async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(endpoint, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) =>
                url.searchParams.set(key, value)
            );
        }

        const response = await this.request.get(url.toString());

        if (!response.ok()) {
            throw new Error(`GET ${endpoint} failed with status ${response.status()}`);
        }

        return response.json() as Promise<T>;
    }

    protected async post<T>(endpoint: string, data?: unknown): Promise<T> {
        const url = new URL(endpoint, this.baseUrl);

        const response = await this.request.post(url.toString(), {
            data,
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok()) {
            throw new Error(`POST ${endpoint} failed with status ${response.status()}`);
        }

        return response.json() as Promise<T>;
    }

    protected async put<T>(endpoint: string, data?: unknown): Promise<T> {
        const url = new URL(endpoint, this.baseUrl);

        const response = await this.request.put(url.toString(), {
            data,
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok()) {
            throw new Error(`PUT ${endpoint} failed with status ${response.status()}`);
        }

        return response.json() as Promise<T>;
    }

    protected async delete(endpoint: string): Promise<void> {
        const url = new URL(endpoint, this.baseUrl);

        const response = await this.request.delete(url.toString());

        if (!response.ok()) {
            throw new Error(`DELETE ${endpoint} failed with status ${response.status()}`);
        }
    }
}
