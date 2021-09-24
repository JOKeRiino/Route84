import _K from '../kaboom.js'

export default function _GAMEEND (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')

    add([rect(700,400),color(40,40,80),layer('bg')]);
    add([ text("Congratulations!"),pos(215,20),layer("bg"),scale(.4)]);
    add([ text("Game Won!"),pos(274,55),layer("bg"),scale(.4)]);


    add([ text("Days needed: " + PLAYER_DATA.GAME_DAY),pos(144,125),layer("bg"),scale(.4)]);
    add([ text("Exp. gained: " + Math.floor(PLAYER_DATA.XP)),pos(144,155),layer("bg"),scale(.4)]);
    add([ text("Items bought: " + PLAYER_DATA.ITEMSBOUGHT +"/14 = " + Math.floor((PLAYER_DATA.ITEMSBOUGHT/14)*100) + "%"),pos(144,185),layer("bg"),scale(.4)]);
    add([ text("Time played: " + Math.floor(time()/60)+" Min "+Math.floor(time()%60)+" Sec"),pos(144,215),layer("bg"),scale(.4)]);
    
    let resumeButton = add([
        sprite("pause-menu-button"),
        pos(266,300),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "resume",
        scale(3.5)
    ])

    add([ text("Go Home"),pos(288,312),layer("ui"),scale(.4)]);

    clicks("resume", () => {
        _K.go('home',PLAYER_DATA);
    })
}