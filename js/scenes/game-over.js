import _K from '../kaboom.js'

export default function _GAMEOVER (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')

    add([rect(700,400),color(40,40,80),layer('bg')]);
    add([ text("Game Lost!"),pos(270,55),layer("bg"),scale(.4),color(255,0,0)]);
    add([ text("You didn't manage to pay the debt in time!"),pos(74,85),layer("bg"),scale(.3)]);

    add([ text("Debt remaining: $" + PLAYER_DATA.DEBT),pos(144,145),layer("bg"),scale(.4),color(255,0,0)]);
    add([ text("Days played: " + PLAYER_DATA.GAME_DAY),pos(144,175),layer("bg"),scale(.4)]);
    add([ text("Exp. gained: " + Math.floor(PLAYER_DATA.XP)),pos(144,205),layer("bg"),scale(.4)]);
    add([ text("Items bought: " + PLAYER_DATA.ITEMSBOUGHT +"/14 = " + Math.floor((PLAYER_DATA.ITEMSBOUGHT/14)*100) + "%"),pos(144,235),layer("bg"),scale(.4)]);
    add([ text("Time played: " + Math.floor(time()/60)+" Min "+Math.floor(time()%60)+" Sec"),pos(144,265),layer("bg"),scale(.4)]);
    
    let resumeButton = add([
        sprite("pause-menu-button"),
        pos(266,310),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "resume",
        scale(3.5)
    ])

    add([ text("Go Home"),pos(288,322),layer("ui"),scale(.4)]);

    clicks("resume", () => {
        _K.go('home',PLAYER_DATA);
    })
}