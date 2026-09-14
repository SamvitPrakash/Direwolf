import NotificationService from "../../services/notifications/NotificationService";
import NotificationItem from "../components/notifications/Notification_Item"
import NotifdService from "../../services/shared_libraries/NotifdService"
import { ICON_SIZE } from "../../constants/icons"
import { Astal, Gtk } from "ags/gtk4"
import { createBinding, For } from "gnim";

export default function Notifications() {
    const notifd = NotifdService.get_default().getNotifd();
    const notificationService = NotificationService.get_default();

    const modal_open = createBinding(notificationService, "modal_open");

    const notifications = createBinding(notificationService, "notifications");
    const dnd = createBinding(notifd, "dont_disturb");

    return (
        <window 
            visible={modal_open}
            class={'.'}
            widthRequest={350}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        >
            <box
                class={"top-bar notifications-box"}
                orientation={Gtk.Orientation.VERTICAL}
                spacing={0}
            >
                <centerbox
                    class={'notification-header'}
                >
                    <button $type="start" onClicked={() => notificationService.modal_toggle()}>
                        <image icon_name={'go-previous-symbolic'} class={'icon notification-icon'} pixel_size={ICON_SIZE}/>
                    </button>

                    <label 
                        $type="center"
                        label={"Notifications"} 
                        class={'nandinagari notification-title'}

                    />

                    <button
                        $type="end"
                        onClicked={() => {
                            notifd.set_dont_disturb(!dnd())
                            notificationService.toggle_toast();  
                        }}
                        tooltipText={dnd.as((d) => !d ? 'Enable Do Not Disturb' : 'Disable Do Not Disturb')}
                    >
                        <image 
                            pixel_size={ICON_SIZE}
                            icon_name={dnd.as((d) => !d ? 'notifications-disabled-symbolic' : 'preferences-system-notifications-symbolic')} 
                            class={dnd.as((d) => {
                                if (d) return 'notification-icon notification-icon-active';
                                else return 'icon notification-icon';
                            })}
                        />
                    </button>
                    
                </centerbox>

                <scrolledwindow
                    maxContentHeight={350}
                    heightRequest={300}
                    vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
                    hscrollbarPolicy={Gtk.PolicyType.NEVER}
                    overlay_scrolling
                >
                    <box
                        hexpand
                        spacing={3}
                        orientation={Gtk.Orientation.VERTICAL}
                        class={"notification-items-container"}
                    >
                    
                        <For each={notifications}>
                            {(notification) => (
                                <NotificationItem notification_item={notification}/>
                            )}
                        </For>
                        
                    </box>
                </scrolledwindow>
                
            </box>

        </window>
    )
}