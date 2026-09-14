import Mpris from "gi://AstalMpris"
import { createState } from "gnim"

export default class MprisService {
  static instance: MprisService
  static mpris: any


  static get_default() {
    if (!MprisService.instance) MprisService.instance = new MprisService()
    return MprisService.instance
  }

  private constructor() {
    MprisService.mpris = Mpris.get_default()
  }

  public getMpris() {
    return MprisService.mpris
  }

}
