import _K from '../kaboom.js'

export default function _TUTORIAL (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')
    
    add([rect(700,400),color(40,40,80),layer('bg')]);
    add([text("TUTORIAL"),pos(280,20),layer("bg"),scale(.4)]);
    add([text("1. Your goal is to refuel the cars. If a car stops\n   at a gas pump, click on it to reveal the refue-\n   ling minigame."),pos(40,80), layer("obj"),scale(.25)])
    add([text("2. To beat the minigame, spam"),pos(40,140), layer("obj"),scale(.25)]);
    add([text("[SPACEBAR]"),pos(375,141), layer("obj"),scale(.25),color(235,40,40)]);
    add([text("repeatedly"),pos(495,140), layer("obj"),scale(.25)]);
    add([text("   and keep the yellow fuel level within the green\n   bar (Watch out for the BORDERS!)"),pos(40,160), layer("obj"),scale(.25)]);
    add([text("3. Buy upgrades to level up and therefore earn more\n   money from fueling up cars."),pos(40,205), layer("obj"),scale(.25)]);
    add([text("4. The Clerk is a donkey."),pos(40,250), layer("obj"),scale(.25)]);
    add([text("5. Have fun :)"),pos(40,275), layer("obj"),scale(.25)]);

    add([
        sprite("pause-menu-button"),
        pos(230,300),
        layer("ui"),
        area(),
        "start",
        scale(5,3.5),
        cursor('pointer')
    ])
    add([
        text("Start Chapter 1"),
        pos(250,315),
        layer("ui"),
        scale(.3),
    ])
    
    clicks("start", () => {
        _K.go('game-desert',PLAYER_DATA);
    })

}