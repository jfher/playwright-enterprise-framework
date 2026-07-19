/**
 * Generic retry utility with configurable backoff.
 */

/**
 * Retries an async function up to `maxAttempts` times with a delay between attempts.
 *
 * @param fn - The async function to retry.
 * @param maxAttempts - Maximum number of attempts (default: 3).
 * @param delayMs - Delay between attempts in milliseconds (default: 1000).
 * @returns The result of the function if it eventually succeeds.
 * @throws The last error if all attempts fail.
 */
export async function retryAction<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1_000
): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));

            if (attempt < maxAttempts) {
                await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
            }
        }
    }

    throw lastError;
}
