import Gio from 'gi://Gio'
import GdkPixbuf from 'gi://GdkPixbuf'
import { Gtk } from 'ags/gtk4'
import { ICON_SIZE } from '../../../constants/icons';
import { createBinding, createEffect } from 'gnim';
import type Tray from 'gi://AstalTray'

interface TrayIconProps {
    item: Tray.TrayItem;
    class?: string;
}

export default function TrayIconMenu({item, class: className}: TrayIconProps) {
    const button = new Gtk.MenuButton();
    const title = createBinding(item, 'title');
    const menuModel = createBinding(item, 'menu_model');
    const actionGroup = createBinding(item, 'action_group');

    const image = new Gtk.Image();

    image.set_pixel_size(ICON_SIZE+1);
    image.set_css_classes(['icon']);


    createEffect(() => {    
        
        if (item.gicon instanceof Gio.FileIcon) {
            const gicon = createBinding(item, 'gicon');
            image.set_from_file(gicon().to_string() || '');
            
        } else if (item.gicon instanceof GdkPixbuf.Pixbuf) {
            const gicon = createBinding(item, 'gicon');
            image.set_from_pixbuf(gicon());

        } else if (item.gicon instanceof Gio.ThemedIcon) {
            const icon = createBinding(item, 'icon_name');
            image.set_from_icon_name(icon() || '');

        }

    });
       
    button.set_tooltip_text(title());
    
    createEffect(() => {
        const model = menuModel();

        if (!model)
            return;

        if (model.get_n_items() === 0)
            return;

        button.set_menu_model(model);
    });


    createEffect(() => {
        const group = actionGroup();

        if (!group)
            return;

        if (group.list_actions().length === 0)
            return;

        
        // for(const i in group) console.log(i);
        console.log(group.action_state_changed);
        console.log('\n\n\n\n\n\n\n\n\n\n\n');

        button.insert_action_group("dbusmenu", group);
    });
    
    
    button.set_child(image);
    button.set_css_classes(className ? [className] : []);

    return (button);

}