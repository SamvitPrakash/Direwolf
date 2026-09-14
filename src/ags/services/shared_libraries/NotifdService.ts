import Notifd from "gi://AstalNotifd"

export default class NotifdService {
    static instance: NotifdService;
    static notifd: Notifd.Notifd;

    private constructor() {
        NotifdService.notifd = Notifd.get_default();
        NotifdService.notifd.set_default_timeout(2000);
    }

    static get_default() {
        if (!NotifdService.instance) NotifdService.instance = new NotifdService();
        return NotifdService.instance;
    }

    public getNotifd() {
        return NotifdService.notifd;
    }

}