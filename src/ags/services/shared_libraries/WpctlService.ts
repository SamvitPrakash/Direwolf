import Wp from "gi://AstalWp"

export default class WpctlService {
  static instance: WpctlService
  static wpctl: any

  static get_default() {
    if (!WpctlService.instance) WpctlService.instance = new WpctlService()
    return WpctlService.instance
  }

  private constructor() {
    WpctlService.wpctl = Wp.get_default()
  }

  public getWpctl() {
    return WpctlService.wpctl
  }
}
