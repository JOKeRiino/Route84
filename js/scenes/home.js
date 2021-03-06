import _K from '../kaboom.js'

export default function _HOME (PLAYER_DATA) {
    layers(['bg', 'ui'], 'ui')

    let homeBackground = add([
        sprite("home-bg",{
            anim: "idle",
            animSpeed: 1
        }),
        pos(),
        layer('bg'),
        scale(.9)
    ])
    
    let startGameButton = add([
        sprite("home-menu-button"),
        pos(230,155),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "startgame",
        scale(5,3.5)
    ])
    
    let loadButton = add([
        sprite("home-menu-button"),
        pos(230,215),
        layer("ui"),
        scale(5,3.5),
        area({
            cursor: "pointer",
        }),
        "loadgame"
    ])

    add([ text("Start New Game"),pos(256,170),layer("ui"),scale(.3)]);
    add([ text("Load Game"),pos(285,229),layer("ui"),scale(.33)]);

    clicks("startgame", () => {
        _K.go('story',PLAYER_DATA); //LAUNCH STORYMODE
    })

    clicks("loadgame", () => {
        try {
            if(!getData("localGameSave")){
                throw new Error
            }
            _K.go('game-desert', getData("localGameSave"));
            console.log("Game successfully restored at: " + Date());
            console.log(getData("localGameSave"));
        }
        catch(e) {
            let failure = add([text("There seems to be no saved game! :("),pos(95,329),layer("ui"),scale(.33),color(250,200,50),]);
            wait(5, () => {
                destroy(failure);
            })
            console.log(e)
        }
    })
}