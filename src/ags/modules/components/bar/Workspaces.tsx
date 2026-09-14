import Hyprland from "../../../services/shared_libraries/HyprlandService"
import getWorkspaceGroup from "../../../utilities/workspaces"
import toRoman from "../../../utilities/to_numerals";
import { activeWorkspaces_button, activeWorkspace_label } from "../../../utilities/active_workspaces";
import { createBinding, For, createComputed } from 'gnim'

export default function Workspaces() {
    const hypr = Hyprland.get_default().getHypr();

    const focusedWorkspace = createBinding(hypr, "focused_workspace");
    const workspaces = createBinding(hypr, "workspaces");

    const visibleIds = focusedWorkspace.as((focused) => {
        const currentId = focused?.id ?? 1
        return getWorkspaceGroup(currentId, 10)
    })

    const activeIds = workspaces.as((workspaces) => {
        var activeIds = [];
        
        for (const i in workspaces) {
            const workspace = workspaces[i].id;
            activeIds.push(workspace);
        }
        
        return activeIds;
    });

    const labelClass = createComputed(() => {
        const focused = focusedWorkspace()
        const active = activeIds()

        return (id: number) =>
            `${focused?.id === id
                ? "workspace-button-label-current"
                : "workspace-button-label"} ${
                activeWorkspace_label(active, id)
            } small nandinagari`
    })

    return (
        <box
            $type='center'
            class={"top-bar"}
        >
            <For each={visibleIds} >
                {(id) => (
                    <button 
                        class={activeIds.as((activeIds) => activeWorkspaces_button(activeIds, id))}
                        onClicked={() => hypr.dispatch("workspace", `${id}`)}
                    >
                        <label
                            label={toRoman(id)}
                            class={labelClass.as((labelClass) => labelClass(id))}
                        />
                    </button>

                )}
            </For>
        </box>
    )
}