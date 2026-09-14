import NmService from "../../../services/shared_libraries/NmService";
import BluetoothService from "../../../services/shared_libraries/BluetoothService";
import WpctlService from "../../../services/shared_libraries/WpctlService";
import TrayService from "../../../services/shared_libraries/TrayService";
import TrayIconMenu from "./Tray_Icon_Menu";
import { ICON_SIZE } from "../../../constants/icons";
import { createBinding, createEffect, createState, For } from "gnim";
import { Gtk } from "ags/gtk4";

export default function SystemTray() {
    /*
        Astal Tray
        ==================
    */
    const tray = TrayService.get_default().getTray();
    const items = createBinding(tray, 'items');

    /* 
        Network Manager
        ==================
    */
    const nm = NmService.get_default().getNm();

    const primary = createBinding(nm, 'primary');
    const wifi = createBinding(nm, 'wifi');

    const wifiIcon = createBinding(nm.wifi, 'icon_name');
    const wiredIcon = createBinding(nm.wired, 'icon_name');

    const networkIcon = primary.as((primary) => {
        switch (primary) {
            case 0:
                return wifiIcon;

            case 1:
                return wiredIcon;

            case 2:
                return wifiIcon;

        }
    })

    const wifiSSID = wifi.as((wifi) => wifi.ssid)

    const networkSSID = primary.as((primary) => {
        switch (primary) {
            case 0:
                return wifiSSID;

            case 1:
                return 'Ethernet';

            case 2:
                return wifiSSID;

        }
    })

    /* 
        Bluetooth Control
        ==================
    */
    const [bluetoothIcon, setBluetoothIcon] = createState<string[][]>([]);

    const bluetoothctl = BluetoothService.get_default().getBluetoothctl();


    createEffect(() => {
        const bluetoothPowered = createBinding(bluetoothctl, 'is_powered');
        const bluetoothConnected = createBinding(bluetoothctl, 'is_connected');
        const bluetoothDevices = createBinding(bluetoothctl, 'devices');

        setBluetoothIcon([]); // Reset the bluetoothIcon state before updating it

        if (bluetoothPowered()) {
            if (bluetoothConnected()) {
                for (var i = 0; i < bluetoothDevices().length; i++) {
                    const device = bluetoothDevices()[i];
                    const deviceConnected = createBinding(device, 'connected');

                    if (deviceConnected()) {
                        const deviceIcon = createBinding(device, 'icon');
                        setBluetoothIcon(prev => [...prev, [deviceIcon() + '-symbolic', device.name]]);
                    }
                }

            } else setBluetoothIcon([['bluetooth-active-symbolic', 'No Devices Connected']]);

        } else setBluetoothIcon([['bluetooth-disabled-symbolic', 'Bluetooth Disabled']]);

    })

    /*
        Wireplumber
        ==================
    */
    const wpctl = WpctlService.get_default().getWpctl();

    const defaultSpeaker = createBinding(wpctl, 'default_speaker');
    const volumeIcon = createBinding(defaultSpeaker(), 'volume_icon');

    return (
        <box
            spacing={8}
            class={"top-bar system-tray-bar"}
        >
            <box spacing={8}>              
                <For each={items} >
                    {(item) => (
                        <TrayIconMenu item={item} class={'system-tray-menu'}/>
                    )}
                </For>
                
            </box>

            <box spacing={8}>
                <image
                    iconName={networkIcon()}
                    class={"icon"}
                    pixelSize={ICON_SIZE}
                    tooltipText={networkSSID()}
                />

                <For each={bluetoothIcon} >
                    {(icon) => (
                        <image
                            iconName={icon[0]}
                            class={"icon"}
                            pixelSize={ICON_SIZE}
                            tooltipText={icon[1]}
                        />
                    )}
                </For>
            </box>

            <image
                iconName={volumeIcon((t) => t)}
                class={"icon"}
                pixelSize={ICON_SIZE}
            />

            <image
                iconName={'view-more-horizontal-symbolic'}
                class={"icon"}
                pixelSize={ICON_SIZE}
                tooltipText={'System Tray'}
            />

        </box>
    )
}