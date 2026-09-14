import NotificationToastItem from "../components/notifications/Notification_Toast_Item";
import NotifdService from "../../services/shared_libraries/NotifdService";
import NotificationService from "../../services/notifications/NotificationService";
import Gtk from "gi://Gtk?version=4.0";
import {createBinding, For} from "gnim";
import { Astal } from "ags/gtk4";

export default function NotificationToast(){
    const notifd = NotifdService.get_default().getNotifd();
    const notification_service = NotificationService.get_default();

    const notifications = createBinding(notifd, "notifications");
    const toast_open = createBinding(notification_service, "toast_open");

    return(
        <window
            visible={notifications.as((t) => t.length > 0 && toast_open())}
            class={'notification-toasts-container'}
            anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT}
            heightRequest={0}
        >
            <box
                hexpand
                spacing={3}
                orientation={Gtk.Orientation.VERTICAL}
                valign={Gtk.Align.END}
                class={"notification-items-container"}
            >
            
                <For each={notifications}>
                    {(notification) => (
                        <NotificationToastItem notification_item={notification}/>
                    )}
                </For>
                
            </box>

        </window>
    )

}