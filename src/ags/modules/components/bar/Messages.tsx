import NotificationService from "../../../services/notifications/NotificationService";
import {ICON_SIZE} from '../../../constants/icons';
import { createBinding } from "gnim";

export default function Messages(){
    const notificationService = NotificationService.get_default();

    const available = createBinding(notificationService, "notifications_available");
    const unseen_notifications = createBinding(notificationService, "unseen_notifications");

    return (
        <box 
            visible={available}
            class={"top-bar messages-bar"}
        >
            <button  class={'messages-button'} onClicked={() => notificationService.modal_toggle()}>
                <image 
                    iconName={'mail-unread-symbolic'} 
                    pixelSize={ICON_SIZE+2}
                    class={unseen_notifications.as((t) => {
                        if(t) return "messages-icon messages-icon-alert";
                        else return "icon messages-icon";
                    })}
                />
            </button>
        </box>
    )   
}