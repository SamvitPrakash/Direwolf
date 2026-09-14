import type Mpris from "gi://AstalMpris"
import MprisService from "../../../services/shared_libraries/MprisService"
import MediaPlayerService from "../../../services/media/MediaPlayerService";
import Pango from "gi://Pango"
import Gtk from "gi://Gtk?version=4.0";
import { ICON_SIZE } from "../../../constants/icons"
import { createBinding, createEffect, createState } from "gnim";

export default function MediaPill(){
    const [title, setTitle] = createState('');
    const [playback, setPlayback] = createState(false);
    const [coverArt, setCoverArt] = createState('');
    const [play_next, setPlay_next] = createState<(() => void) | null>(null);
    const [play_prev, setPlay_prev] = createState<(() => void) | null>(null);
    const [play_pause, setPlay_pause] = createState<(() => void) | null>(null);
    const [player, setPlayer] = createState<Mpris.Player | null>(null);
    const [can_go_next, setCanGoNext] = createState(false);
    const [can_go_previous, setCanGoPrevious] = createState(false);
    const [can_play, setCanPlay] = createState(false);

    const mpris = MprisService.get_default().getMpris();
    const mediaPlayerService = MediaPlayerService.get_default();

    const player_count = createBinding(mediaPlayerService, "player_count");
    
    createEffect(() => {
        const players = createBinding(mpris, "players");
        const playerIndex = createBinding(mediaPlayerService, "player_index");
        const player = players()[playerIndex()];
        
        if(!player) return;
        
        createEffect(() => {
            if(!player) return;

            const title = createBinding(player, 'title');
            const artist = createBinding(player, 'artist');
            const playback = createBinding(player, 'playback_status');
            const coverArt = createBinding(player, 'cover_art').as((art) => art ? art : '/home/_c3rberus/GitHub/Direwolf/assets/placeholders/media/paper-craft-art-musical-note.jpg');
            const canGoNext = createBinding(player, 'can_go_next');
            const canGoPrevious = createBinding(player, 'can_go_previous');
            const canPlay = createBinding(player, 'can_play');
            const canPause = createBinding(player, 'can_pause');

            setTitle(title() + " - " + artist());
            setPlayback(playback() == 0 ? false : true);
            setCoverArt(coverArt());
            setPlayer(player);
            setCanGoNext(canGoNext());
            setCanGoPrevious(canGoPrevious());
            setCanPlay(canPlay() && canPause());

            const playNext =  () => {
                player?.next();
            }
            

            const playPrev =  () => {
                player?.previous();
            }
            const playPause =  () => {
                player?.play_pause();
            }

            setPlay_next(() => playNext);
            setPlay_prev(() => playPrev);
            setPlay_pause(() => playPause);
        });

    })

    const openModal = () => {
        mediaPlayerService.modal_toggle();
    }
    
    return (
        <box
            visible={player_count.as((index) => index != 0)}
            class={"top-bar media-pill"}
            widthRequest={250}
            hexpand={false}
        >
            <button
                class={'media-pill-button'}
                onClicked={() => openModal()}
            >
                <box
                    spacing={10}
                    class={'media-pill-box'}
                    hexpand
                >
                    <image 
                        file={coverArt((t) => t)} 
                        class={'media-album-cover'}
                        pixelSize={28}
                        overflow={Gtk.Overflow.HIDDEN}
                        halign={Gtk.Align.START}
                    />
                    
                    <label 
                        label={title((t) => t)} 
                        class={'media-label small nandinagari'} 
                        ellipsize={Pango.EllipsizeMode.END} 
                        hexpand={false} 
                        // maxWidthChars={20}
                        maxWidthChars={player((p) =>{
                            if(p?.can_go_previous && p?.can_go_next) return 20;
                            else return 30;
                        })}
                        tooltipText={title((t) => t)}
                        halign={Gtk.Align.END}
                    />
                </box>
            </button>

            <box
                halign={Gtk.Align.END}
            >
                <button class={'media-control-button'} onClicked={() => play_prev()?.()} visible={can_go_previous((t) => t)}>
                    <image iconName={'media-skip-backward-symbolic'} class={'icon media-icon'} pixelSize={ICON_SIZE-3}/>
                </button>

                <button class={'media-control-button'} onClicked={() => play_pause()?.()} visible={can_play((t) => t)}>
                    <image iconName={playback((p) => !p ? 'media-playback-pause-symbolic' : 'media-playback-start-symbolic')} class={'icon media-icon'} pixelSize={ICON_SIZE-3}/>
                </button>

                <button class={'media-control-button'} onClicked={() => play_next()?.()} visible={can_go_next((t) => t)}>
                    <image iconName={'media-skip-forward-symbolic'} class={'icon media-icon'} pixelSize={ICON_SIZE-3}/>
                </button>
            </box>

        </box>
    )

}