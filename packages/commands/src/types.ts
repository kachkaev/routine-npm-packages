export interface CommandOptions {
  logger: Console;
}
export type Command = (options: CommandOptions) => Promise<void>;

export class CommandError extends Error {}
