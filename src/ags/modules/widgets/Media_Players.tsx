import MediaCard from "../components/media_players/Media_Card"
import MprisService from "../../services/shared_libraries/MprisService"
import type Mpris from "gi://AstalMpris"
import MediaPlayerService from "../../services/media/MediaPlayerService"
import Gtk from "gi://Gtk?version=4.0";
import {Astal} from "ags/gtk4"
import { createBinding, For, Accessor, createEffect } from "gnim";
import { ICON_SIZE } from "../../constants/icons";

export default function MediaPlayers(){
    const mpris = MprisService.get_default().getMpris();
    const mediaPlayerService = MediaPlayerService.get_default();

    const players = createBinding(mpris, "players") as Accessor<Mpris.Player[]>;
    const modalOpen = createBinding(mediaPlayerService, "modal_open");

    createEffect(() => {
        const players = createBinding(mpris, "players");
        if(players().length == 0) {
            mediaPlayerService.player_index = 0;
            mediaPlayerService.modal_open = false;
        }

        mediaPlayerService.player_count = players().length;
    });

    const closeModal = () => {
        mediaPlayerService.modal_toggle();
    }

    return (
        <window
            visible={modalOpen.as((open) => open)}
            class={'media-players-modal'}
            layer={Astal.Layer.OVERLAY}
            exclusivity={Astal.Exclusivity.NORMAL}
        >
            <box
                orientation={Gtk.Orientation.VERTICAL}
                >
                <button
                    class={'media-players-modal-button'}
                    onClicked={() => closeModal()}
                >
                    <image 
                        iconName={'window-close-symbolic'} 
                        class={'icon media-players-modal-icon'} 
                        pixelSize={ICON_SIZE}
                        halign={Gtk.Align.END}
                    />
                </button>

                <box
                    spacing={25}
                    class={'media-players-container'}
                >
                    <For each={players}>
                        {(player, i) => (
                            <MediaCard player={player} index={i()}/>
                        )}
                    </For>
                </box>
            </box>
        </window>
    )
}