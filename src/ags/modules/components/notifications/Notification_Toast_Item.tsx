import type Notifd from "gi://AstalNotifd"
import NotificationService from "../../../services/notifications/NotificationService";
import Pango from "gi://Pango"
import { ICON_SIZE } from "../../../constants/icons";
import { Gtk } from "ags/gtk4"
import { createBinding } from "gnim";

interface NotificationItemProps {
    notification_item: Notifd.Notification
}

export default function NotificationToastItem({ notification_item }: NotificationItemProps) {
    const notificationService = NotificationService.get_default();

    notificationService.push_notification(notification_item);

    const summary = createBinding(notification_item, "summary");
    const body = createBinding(notification_item, "body");
    const image = createBinding(notification_item, "image");

    return (
        <box
            class={'notification-toast-item-container'}
            spacing={10}
        >
            <image
                valign={Gtk.Align.START}
                class={'notification-item-icon'}
                file={image()}
                pixel_size={ICON_SIZE+25}
                overflow={Gtk.Overflow.HIDDEN}
            />

            <box
                hexpand
                orientation={Gtk.Orientation.VERTICAL}
                spacing={0}
                class={'notification-item-text-container'}
            >
                
                <label 
                    wrap 
                    label={summary()} 
                    halign={Gtk.Align.START} 
                    ellipsize={Pango.EllipsizeMode.END}
                    maxWidthChars={25}
                    class={'nandinagari notification-item-summary'}
                />

                <label 
                    wrap 
                    label={body()} 
                    halign={Gtk.Align.START} 
                    maxWidthChars={25}
                    ellipsize={Pango.EllipsizeMode.END}
                    class={'small nandinagari notification-item-body'}
                />
                
            </box>

            <button 
                icon_name={'window-close-symbolic'} 
                class={'notification-toast-item-button'}
                valign={Gtk.Align.START}
                onClicked={() => {
                    notification_item.dismiss();
                    notificationService.remove_notification(notification_item);
                }}
            />

        </box>
    )
}