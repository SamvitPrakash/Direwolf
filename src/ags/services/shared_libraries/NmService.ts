import Network from "gi://AstalNetwork"

export default class NmService {
  static instance: NmService
  static nm: any

  static get_default() {
    if (!NmService.instance) NmService.instance = new NmService()
    return NmService.instance
  }

  private constructor() {
    NmService.nm = Network.get_default()
  }

  public getNm() {
    return NmService.nm
  }
}
