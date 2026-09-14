export function activeWorkspaces_button(activeWorkspaces: number[], currentId: number): string {
    const states = ['workspace-button-active', 'workspace-button-active-start', 'workspace-button-active-center', 'workspace-button-active-end'];

    if (activeWorkspaces.includes(currentId)) {
        if (activeWorkspaces.includes(currentId - 1) && activeWorkspaces.includes(currentId + 1)) return states[2];
        else if (!(activeWorkspaces.includes(currentId - 1)) && (activeWorkspaces.includes(currentId + 1))) return states[1];
        else if (!(activeWorkspaces.includes(currentId + 1)) && (activeWorkspaces.includes(currentId - 1))) return states[3];
        else return states[0];

    } else return 'workspace-button';


}

export function activeWorkspace_label(activeWorkspaces: number[], currentId: number): string {
    
    if (activeWorkspaces.includes(currentId)) {
        return 'workspace-button-label-active';
    }else return 'workspace-button-label';
}