"use strict";
function localSave() {
    const { chats } = els();
    let savedChats = btoa(JSON.stringify(chats));
    localStorage.removeItem('chats');
    localStorage.setItem('chats', savedChats);
    console.log("Chats saved as: 'chats'");
    return savedChats;
}
function localLoad() {
    try {
        //Load chats
        let loadChatString = localStorage.getItem('chats');
        if (loadChatString == null) {
            console.log("Failed to load chats. Likely empty");
        }
        else {
            let loadSaveState = JSON.parse(atob(loadChatString));
            console.log("Chats loaded from: ", loadSaveState);
            clearAllChats();
            window.app.chats = loadSaveState;
            reloadChat();
        }
    }
    catch (exception) {
        console.log("Error loading chats");
        console.log(exception);
    }
}
// function localsave() {
//     let savegame = btoa(JSON.stringify(game_save));
//     localStorage.setItem('tree_game_save_data', savegame);
//     console.log("Game saved as: ", savegame);
//     let savesetgame = btoa(JSON.stringify(setting_save));
//     localStorage.setItem('tree_setting_save', savesetgame);
//     console.log("Settings saved as:", savesetgame);
//     alert_box("Game saved to localStorage!");
// }
// function localLoad() {
//     try {
//         //loading game_save
//         let loadSaveStateString = localStorage.getItem('tree_game_save_data');
//         let loadSaveState = JSON.parse(atob(loadSaveStateString));
//         console.log("Game loaded from: ", loadSaveState);
//         game_save = load(loadSaveState, game_base_values);
//         //loading settings
//         let loadSaveStateStringSettings = localStorage.getItem('tree_setting_save');
//         let loadSaveStateSettings = JSON.parse(atob(loadSaveStateStringSettings));
//         console.log("Settings loaded from: ", loadSaveStateSettings);
//         setting_save = load(loadSaveStateSettings, setting_base_values);
//     }
//     catch (exception) {
//         game_save = game_base_values;
//         setting_save = setting_base_values;
//         console.log("No save detected, loading base values");
//         tutorial_needed = 1;
//     }
// }
