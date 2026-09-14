import CommandRequest from "./Command_Request"
import { commandHandler } from "./Command_Handler"

export default class CommandRegistry {
    private static instance: CommandRegistry | null = null;

    private registry: Map<string, commandHandler>

    private constructor() {
        this.registry = new Map<string, commandHandler>()
    }

    static get_default(): CommandRegistry {
        if (!CommandRegistry.instance) {
            CommandRegistry.instance = new CommandRegistry()
        }
        return CommandRegistry.instance
    }

    public register(command: string, handler: commandHandler) {
        if(this.registry.has(command)) {
            throw new Error(`Command ${command} is already registered.`)
        }

        this.registry.set(command, handler);
    }

    public async execute(request: CommandRequest): Promise<unknown> {
        const handler = this.registry.get(request.command)
     
        if (!handler) {
            throw new Error(`Command ${request.command} does not exist.`)
        }

        return await handler(request.args)
    }

}