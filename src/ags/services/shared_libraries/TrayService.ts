import Tray from "gi://AstalTray";

export default class TrayService {
    static instance: TrayService;
    static tray: Tray.Tray;

    public static get_default(): TrayService {
        if (!TrayService.instance) {
            TrayService.instance = new TrayService();
        }
        return TrayService.instance;
    }

    private constructor() {
        TrayService.tray = Tray.get_default();
    }

    public getTray(): Tray.Tray {
        return TrayService.tray;
    }
    
}