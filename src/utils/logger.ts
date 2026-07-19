/**
 * Structured console logger with timestamps.
 * Wraps console methods to provide consistent formatting for test output.
 */
export class Logger {

    private static formatTimestamp(): string {
        return new Date().toISOString();
    }

    private static format(level: string, message: string, ...args: unknown[]): string {
        const timestamp = Logger.formatTimestamp();
        const argsStr = args.length > 0 ? ` | ${JSON.stringify(args)}` : "";
        return `[${timestamp}] [${level}] ${message}${argsStr}`;
    }

    static info(message: string, ...args: unknown[]): void {
        console.log(Logger.format("INFO", message, ...args));
    }

    static warn(message: string, ...args: unknown[]): void {
        console.warn(Logger.format("WARN", message, ...args));
    }

    static error(message: string, ...args: unknown[]): void {
        console.error(Logger.format("ERROR", message, ...args));
    }

    static debug(message: string, ...args: unknown[]): void {
        if (process.env.DEBUG === "true") {
            console.debug(Logger.format("DEBUG", message, ...args));
        }
    }

    static step(stepName: string): void {
        console.log(Logger.format("STEP", `▸ ${stepName}`));
    }
}
