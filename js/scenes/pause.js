import _K from '../kaboom.js'

export default function _PAUSE (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')

    add([rect(700,400),color(40,40,80),layer('bg')]);
    add([ text("Game Paused"),pos(247,50),layer("bg"),scale(.4)]);

    let pauseMenu = add([
        sprite("pause-menu"),
        pos(230,80),
        layer("ui"),
        scale(5),
        {
        }
    ])
    
    let resumeButton = add([
        sprite("pause-menu-button"),
        pos(266,120),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "resume",
        scale(3.5)
    ])
    
    let saveButton = add([
        sprite("pause-menu-button"),
        pos(266,175),
        layer("ui"),
        scale(3.5),
        area({
            cursor: "pointer",
        }),
        "save"
    ])
    
    let quitButton = add([
        sprite("pause-menu-button"),
        pos(266,230),
        layer("ui"),
        scale(3.5),
        area({
            cursor: "pointer",
        }),
        "quit"
    ])

    add([ text("Resume"),pos(295,132),layer("ui"),scale(.4)]);
    add([ text("Save"),pos(313,188),layer("ui"),scale(.4)]);
    add([ text("Quit"),pos(313,245),layer("ui"),scale(.4)]);

    clicks("resume", () => {
        _K.go('game-desert',PLAYER_DATA);
    })

    clicks("save", () => {
        setData("localGameSave", PLAYER_DATA);
        console.log("game saved at " + Date());
    })

    clicks("quit", () => {
        _K.go('home',PLAYER_DATA);
    })
}