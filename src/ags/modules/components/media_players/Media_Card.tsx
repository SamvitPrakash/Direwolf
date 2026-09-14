import type Mpris from "gi://AstalMpris"
import MediaPlayerService from "../../../services/media/MediaPlayerService";
import Gtk from "gi://Gtk?version=4.0";
import Pango from "gi://Pango";
import { createBinding } from "gnim";
import { ICON_SIZE } from "../../../constants/icons";

interface MediaCardProps {
    player: Mpris.Player;
    index?: number;
}

export default function MediaCard({ player, index }: MediaCardProps){
        const mediaPlayerService = MediaPlayerService.get_default();
        const playerIndex = createBinding(mediaPlayerService, "player_index");
    
        const title = createBinding(player, 'title');
        const artist = createBinding(player, 'artist');
        const playback = createBinding(player, 'playback_status');
        const coverArt = createBinding(player, 'cover_art').as((art) => art ? art : '/home/_c3rberus/GitHub/Direwolf/assets/placeholders/media/paper-craft-art-musical-note.jpg');
        const canGoNext = createBinding(player, 'can_go_next');
        const canGoPrevious = createBinding(player, 'can_go_previous');
        const canPlay = createBinding(player, 'can_play');
        const canPause = createBinding(player, 'can_pause');


        const setPlayerIndex = () => {
            if(index !== undefined) mediaPlayerService.player_index = index;
        }
    
    return (
        <box
            orientation={Gtk.Orientation.VERTICAL}
        >
            <box 
                class={'top-bar media-card-box shadow'}
                orientation={Gtk.Orientation.VERTICAL}
                widthRequest={200}
            >

                <image 
                    file={coverArt((t) => t)} 
                    class={'media-card-album-cover'}
                    pixelSize={200}
                    overflow={Gtk.Overflow.HIDDEN}
                    halign={Gtk.Align.CENTER}
                />
                
                <box
                    orientation={Gtk.Orientation.VERTICAL}
                >

                    <label 
                        label={title((t) => t)} 
                        class={'media-card-label-title nandinagari'} 
                        ellipsize={Pango.EllipsizeMode.END} 
                        hexpand={false} 
                        maxWidthChars={25}
                        halign={Gtk.Align.CENTER}
                    />

                    <label 
                        label={artist((a) => a)} 
                        class={'media-card-label-artist small nandinagari'} 
                        ellipsize={Pango.EllipsizeMode.END} 
                        hexpand={false} 
                        maxWidthChars={25}
                        halign={Gtk.Align.CENTER}
                    />

                </box>

                <box
                    halign={Gtk.Align.CENTER}
                    spacing={10}
                    class={'media-card-controls-box'}
                >
                    <button class={'media-card-control-button'} onClicked={() => player.previous()} visible={canGoPrevious((t) => t)}>
                        <image iconName={'media-skip-backward-symbolic'} class={'icon media-card-icon'} pixelSize={ICON_SIZE}/>
                    </button>

                    <button class={'media-card-control-button'} onClicked={() => player.play_pause()} visible={canPlay((t) => t) && canPause((t) => t)}>
                        <image iconName={playback((p) => !p ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')} class={'icon media-card-icon'} pixelSize={ICON_SIZE}/>
                    </button>

                    <button class={'media-card-control-button'} onClicked={() => player.next()} visible={canGoNext((t) => t)}>
                        <image iconName={'media-skip-forward-symbolic'} class={'icon media-card-icon'} pixelSize={ICON_SIZE}/>
                    </button>
                </box>
            </box>

            <box 
                class={'top-bar media-card-toggle-box'}
                halign={Gtk.Align.CENTER}
            >
                <button  class={'media-card-toggle'} onClicked={() => setPlayerIndex()} >
                    <image 
                        iconName={'object-select-symbolic'} 
                        class={playerIndex.as((i) =>{
                            if(i === index) {
                                return 'media-card-toggle-icon-active';
                            } else {
                                return 'icon media-card-toggle-icon';
                            }
                        })}
                        pixelSize={ICON_SIZE}
                    />
                </button>
            </box>

        </box>
    )
}