import Battery from "gi://AstalBattery"

export default class BatteryService {
  static instance: BatteryService
  static battery: any

  static get_default() {
    if (!BatteryService.instance) BatteryService.instance = new BatteryService()
    return BatteryService.instance
  }

  private constructor() {
    BatteryService.battery = Battery.get_default()
  }

  public getBattery() {
    return BatteryService.battery
  }
}
