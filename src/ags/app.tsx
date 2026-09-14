import app from "ags/gtk4/app"
import css from "./styles/dist/main.css"
import Bar from "./modules/widgets/Bar"
import MediaPlayers from "./modules/widgets/Media_Players"
import Notifications from "./modules/widgets/Notifications"
import AudioDisplay from "./modules/widgets/Audio_Display"
import CommandRegistry from "./services/command_registry/Command_Registry"
import ControlPanel from "./modules/widgets/Control_Panel"
import { registerMediaCommands } from "./command_registrars/media/MediaCommandsRegistrars"

import TrayService from "./services/shared_libraries/TrayService"
import { createEffect, createBinding } from "gnim"

const registry = CommandRegistry.get_default()

registerMediaCommands(registry);

app.start({
	css: css,
	instanceName: "Direwolf",
	iconTheme: "Adwaita",
	cursorTheme: "Breeze",
	requestHandler: (request, response) => {
		const [command, ...args] = request
		response(registry.execute({ command, args }));

	},
	main() {
		console.log("Started AGS...");

		return (
			<>
				<Bar />
				<MediaPlayers />
				<Notifications />
				<AudioDisplay />
				{/* <ControlPanel /> */}
			</>
		)
	},
})
