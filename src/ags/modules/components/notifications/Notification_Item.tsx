import type Notifd from "gi://AstalNotifd"
import NotificationService from "../../../services/notifications/NotificationService";
import Pango from "gi://Pango"
import { ICON_SIZE } from "../../../constants/icons";
import { Gtk } from "ags/gtk4"
import { createBinding, createState } from "gnim";

interface NotificationItemProps {
    notification_item: Notifd.Notification
}

export default function NotificationItem({ notification_item }: NotificationItemProps) {
    const [viewMore, setViewMore] = createState(false);

    const notificationService = NotificationService.get_default();

    const app_name = createBinding(notification_item, "app_name");
    const summary = createBinding(notification_item, "summary");
    const body = createBinding(notification_item, "body");
    const image = createBinding(notification_item, "image");

    return (
        <box
            class={'notification-item-container'}
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
                    label={app_name() || "Unknown App"} 
                    halign={Gtk.Align.START} 
                    class={'nandinagari notification-item-title'}
                />
                
                <label 
                    wrap 
                    label={summary()} 
                    halign={Gtk.Align.START} 
                    ellipsize={viewMore.as((t) => !t ? Pango.EllipsizeMode.END : Pango.EllipsizeMode.NONE)}
                    maxWidthChars={25}
                    class={'nandinagari notification-item-summary'}
                />

                <revealer
                    reveal_child={viewMore((t) => t)}
                    class={'notification-item-revealer'}
                >
                    <label 
                        wrap 
                        label={body()} 
                        halign={Gtk.Align.START} 
                        maxWidthChars={25}
                        class={'small nandinagari notification-item-body'}
                    />
                </revealer>
                
            </box>

            <box
                spacing={5}
                orientation={Gtk.Orientation.VERTICAL}
            >
                <button 
                    icon_name={'window-close-symbolic'} 
                    class={'notification-item-button'}
                    valign={Gtk.Align.START}
                    onClicked={() => {
                        notificationService.remove_notification(notification_item);
                    }}
                />

                <button 
                    class={'notification-item-button'}
                    valign={Gtk.Align.END}
                    onClicked={() => setViewMore(!viewMore())}
                >
                    <image
                        icon_name={viewMore.as((t) => !t ? 'go-down-symbolic' : 'go-up-symbolic')}
                        pixel_size={ICON_SIZE-1}
                    />
                </button>

            </box>

        </box>
    )
}