import GoObject from "gi://GObject"
import NotifdService from "../shared_libraries/NotifdService";
import type Notifd from "gi://AstalNotifd"

export default class NotificationService extends GoObject.Object {
    static instance: NotificationService | null = null;
    static notifd = NotifdService.get_default().getNotifd();

    static {
        GoObject.registerClass({
            Signals: {

            },

            Properties: {
                'modal_open': GoObject.ParamSpec.boolean(
                    "modal_open",
                    "Modal Open",
                    "Whether the notification modal is open or not.",
                    GoObject.ParamFlags.READWRITE,
                    false,
                ),

                'unseen_notifications': GoObject.ParamSpec.boolean(
                    "unseen_notifications",
                    "Unseen Notifications",
                    "Whether there are unseen notifications or not.",
                    GoObject.ParamFlags.READWRITE,
                    false,
                ),

                'notifications_available': GoObject.ParamSpec.boolean(
                    "notifications_available",
                    "Notifications Available",
                    "Whether there are notifications available or not.",
                    GoObject.ParamFlags.READWRITE,
                    false,
                ),

                'notifications': GoObject.ParamSpec.object(
                    "notifications",
                    "Notifications",
                    "The list of notifications currently present.",
                    GoObject.ParamFlags.READWRITE,
                    GoObject.Object
                ),

                'toast_open': GoObject.ParamSpec.boolean(
                    "toast_open",
                    "Toast Open",
                    "Whether the notification toast is open or not.",
                    GoObject.ParamFlags.READWRITE,
                    false,
                ),

            },
        }, this)
    }

    private _open: boolean = false;
    private _unseen_notifications: boolean = false;
    private _notifications_available: boolean = false;
    private _notifications: Notifd.Notification[] = [];
    private _toast_open: boolean = false;

    public constructor() {
        super();

        if(NotificationService.notifd.dontDisturb) this.toast_open = false;
        else this.toast_open = true;
    }

    static get_default(): NotificationService {
        if (!this.instance) {
            this.instance = new NotificationService();
        }

        return this.instance;
    }

    public get modal_open(): boolean {
        return this._open;
    }
    
    public set modal_open(value: boolean) {
        if(this._open !== value) {
            this._open = value;
            this.notify("modal_open");
        }
    }

    public modal_toggle(): void {
        this.modal_open = !this.modal_open;
        
        if(this._unseen_notifications && this._open) this.unseen_notifications = false;
    }

    public get unseen_notifications(): boolean {
        return this._unseen_notifications;
    }

    public set unseen_notifications(value: boolean) {
        if(this._unseen_notifications !== value) {
            this._unseen_notifications = value;
            this.notify("unseen_notifications");
        }
    }

    public get notifications_available(): boolean {
        return this._notifications_available;
    }

    public set notifications_available(value: boolean) {
        if(this._notifications_available !== value) {
            this._notifications_available = value;
            this.notify("notifications_available");

            if(!value) {
                this.modal_open = false;
                this.notify("modal_open");
            }

        }
    }

    public get notifications(): Notifd.Notification[] {
        return this._notifications;
    }

    public set notifications(value: Notifd.Notification[]) {
        if(this._notifications !== value) {
            this._notifications = value;
            this.notify("notifications");
        }
    }

    public push_notification(notification: Notifd.Notification): void {
        this.unseen_notifications = this.modal_open ? false : true;
        this.notify("unseen_notifications");

        this.notifications_available = true;
        this.notify("notifications_available");

        this._notifications.unshift(notification);
        this.notify("notifications");
    }

    public remove_notification(notification: Notifd.Notification): void {
        const index = this._notifications.indexOf(notification);
        if (index > -1) {
            this._notifications.splice(index, 1);
            this.notify("notifications");
        }

        if(this._notifications.length === 0) {
            this.notifications_available = false;
            this.notify("notifications_available");
        }

    }

    public clear_notifications(): void {
        this.notifications = [];
        this.notify("notifications");

        this.notifications_available = false;
        this.notify("notifications_available");
    }

    public get toast_open(): boolean {
        return this._toast_open;
    }

    public set toast_open(value: boolean) {
        if(this._toast_open !== value) {
            this._toast_open = value;
            this.notify("toast_open");
        }
    }

    public toggle_toast(): void {
        this.toast_open = !this.toast_open;
    }

}