import Bluetooth from "gi://AstalBluetooth"

export default class BluetoothService {
  static instance: BluetoothService
  static bluetoothctl: any

  static get_default() {
    if (!BluetoothService.instance)
      BluetoothService.instance = new BluetoothService()
    return BluetoothService.instance
  }

  private constructor() {
    BluetoothService.bluetoothctl = Bluetooth.get_default()
  }

  public getBluetoothctl() {
    return BluetoothService.bluetoothctl
  }
}
