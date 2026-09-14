import {ICON_SIZE} from '../../../constants/icons';
import { createPoll } from "ags/time";

export default function Time(){
    const time = createPoll("", 1000, () =>
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }),
    );

    return (
        <box class={"top-bar time-bar"} spacing={8}>
            <image iconName={'preferences-system-time-symbolic'} class={"icon"} pixelSize={ICON_SIZE}/>
            <label label={time} class={'time-label small nandinagari'}/>
        </box>
    )   
}