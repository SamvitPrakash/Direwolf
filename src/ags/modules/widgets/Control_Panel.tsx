import { Astal } from "ags/gtk4";

export default function ControlPanel() {
    return (
        <window
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
            layer={Astal.Layer.OVERLAY}
            class="."
            heightRequest={100}
            widthRequest={250}
            visible
        >
            <box>
                <box/>
                <box>
                    
                </box>
            </box>

        </window>
    )
}