import { Accessor } from "gnim";
import Gtk from "gi://Gtk?version=4.0";
    
interface ProgressBarProps {    
    value: Accessor<number>;
    maxValue: number;
    width?: number;
    height?: number;
    class?: string;
}

export default function ProgressBar({ value, maxValue, width=300, height=5, class:className }: ProgressBarProps) {
    
    return (
        <box
            class={'progress-bar-default ' + className}
            overflow={Gtk.Overflow.HIDDEN}
        >
            <box
                class={'progress-bar-container'}
                widthRequest={width}
                heightRequest={height}
            >
                <box
                    class={'progress-bar-fill'}
                    widthRequest={value((value) => width * (value / maxValue))}
                    heightRequest={height}
                />
            </box>
        </box>
    )

}