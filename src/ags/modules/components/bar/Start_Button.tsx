import {ICON_SIZE} from '../../../constants/icons';

export default function StartButton(){
    return (
        <box class={"top-bar messages-bar start-bar"}>
            <button  class={'messages-button start-button'}>
                {/* <image file={'/home/_c3rberus/GitHub/Direwolf/assets/logos/direwolf4.svg'} class={"icon start-icon"} pixelSize={ICON_SIZE+12}/> */}
                <image iconName={'view-app-grid-symbolic'} class={"icon start-icon"} pixelSize={ICON_SIZE+8}/>
            </button>
        </box>
    )   
}