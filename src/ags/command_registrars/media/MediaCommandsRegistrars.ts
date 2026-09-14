import MediaPlayerService from "../../services/media/MediaPlayerService";
import CommandRegistry from "../../services/command_registry/Command_Registry";

const mediaPlayerService = MediaPlayerService.get_default();

export function registerMediaCommands(registry: CommandRegistry){
    registry.register("toggle-media-modal", async () => {
        mediaPlayerService.modal_toggle();

        return `Media modal ${mediaPlayerService.modal_open ? "opened" : "closed"}`;
        
    });

}