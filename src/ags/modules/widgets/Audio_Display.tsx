import WpctlService from "../../services/shared_libraries/WpctlService"
import ProgressBar from "../components/miscellaneous/Progress_Bar"
import { ICON_SIZE } from "../../constants/icons";
import { createBinding, createState } from "gnim";
import { Astal, Gtk } from "ags/gtk4";

export default function AudioDisplay(){
    const [volumeVisible, setVolumeVisible] = createState(false);
    let volumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const wpctl = WpctlService.get_default().getWpctl();

    const defaultSpeaker = createBinding(wpctl, 'default_speaker');
    const volume = createBinding(defaultSpeaker(), 'volume');
    const icon = createBinding(defaultSpeaker(), 'volume_icon');

    const showVolumeModal = () => {
        setVolumeVisible(true);

        if (volumeTimeout !== null)
            clearTimeout(volumeTimeout);

        volumeTimeout = setTimeout(() => {
            setVolumeVisible(false);
            volumeTimeout = null;
        }, 1100);
    }

    defaultSpeaker().connect('notify::volume', () => {
        showVolumeModal();        
    });

    defaultSpeaker().connect('notify::mute', () => {
        showVolumeModal();
    });

    return (
        <window
            visible={volumeVisible}
            class={'.'}
            layer={Astal.Layer.OVERLAY}
            anchor={Astal.WindowAnchor.BOTTOM}
        >
            <box
                class={'volume-modal-box'}
                spacing={5}
            >
                <image
                    iconName={icon((t) => t)}
                    class={'icon'}
                    pixelSize={ICON_SIZE+1}
                />

                <ProgressBar 
                    value={volume.as((t) => t * 100)} 
                    maxValue={100} 
                    class={'volume-progress-bar'} 
                />
                
                <label 
                    label={volume.as((t) => `${Math.round(t * 100)}`)} 
                    class={'small nandinagari volume-label'}
                />
            </box>
        </window>
    )
}