import Hyprland from "gi://AstalHyprland"

export default class HyprlandService {
  static instance: HyprlandService
  static hypr: any

  static get_default() {
    if (!HyprlandService.instance) {
      HyprlandService.instance = new HyprlandService()
    }
    return HyprlandService.instance
  }

  private constructor() {
    HyprlandService.hypr = Hyprland.get_default()
  }

  getHypr() {
    return HyprlandService.hypr
  }
}
