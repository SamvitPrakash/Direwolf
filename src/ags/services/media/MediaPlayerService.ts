import GoObject from "gi://GObject"
import MprisService from "../shared_libraries/MprisService"
import type Mpris from "gi://AstalMpris"

export default class MediaPlayerService extends GoObject.Object {
    static instance: MediaPlayerService | null = null;

    static {
        GoObject.registerClass({
            Signals: {

            },

            Properties: {
                'modal_open': GoObject.ParamSpec.boolean(
                    "modal_open",
                    "Modal Open",
                    "Whether the media player modal is open or not.",
                    GoObject.ParamFlags.READWRITE,
                    false,
                ),

                'player_index': GoObject.ParamSpec.int(
                    "player_index",
                    "Player Index",
                    "The index of the currently selected media player.",
                    GoObject.ParamFlags.READWRITE, 
                    0,
                    50,
                    0
                ),

                'player_count': GoObject.ParamSpec.int(
                    "player_count",
                    "Player Count",
                    "The number of media players currently available.",
                    GoObject.ParamFlags.READWRITE,
                    0,
                    50,
                    0
                ),
            },

        }, this)
    };

    private _open: boolean = false;
    private _player_index: number = 0;
    private _player_count: number = 0;

    private mprisService: Mpris.Mpris = MprisService.get_default().getMpris();

    static get_default(): MediaPlayerService {
        if (!this.instance) {
            this.instance = new MediaPlayerService();
        }

        return this.instance;
    }

    public play_pause(): void {
        const players = this.mprisService.players;
        if (players.length > 0) {
            const player = players[this._player_index];
            player.play_pause();
        }
    }

    public previous(): void {
        const players = this.mprisService.players;
        if (players.length > 0) {
            const player = players[this._player_index];
            player.previous();
        }
    }

    public next(): void {
        const players = this.mprisService.players;
        if (players.length > 0) {
            const player = players[this._player_index];
            player.next();
        }
    }

    public get modal_open(): boolean {
        return this._open;
    }

    public set modal_open(value: boolean) {
        if (this._open !== value) {
            this._open = value;
            this.notify("modal_open");
        }
    }  

    public modal_toggle(): void {
        if(this._player_count > 0) this.modal_open = !this.modal_open;
    }

    public get player_index(): number {
        return this._player_index;
    }

    public set player_index(value: number) {
        if (this._player_index !== value) {
            this._player_index = value;
            this.notify("player_index");
        }
    }

    public get player_count(): number {
        return this._player_count;
    }

    public set player_count(value: number) {
        if (this._player_count !== value) {
            this._player_count = value;
            this.notify("player_count");
        }
    }

}