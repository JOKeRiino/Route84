import _K from '../kaboom.js'

export default function _DEBT (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')

    add([rect(700,400),color(40,40,80),layer('bg')]);
    add([ text("Pay Debt"),pos(280,20),layer("bg"),scale(.4)]);
    let pA = 100
    action('label', (l) => {
        l.text = "$"+pA;
    })
    add([text("$"+pA),pos(300,220),layer('obj'),scale(.4),'label'])
    
    let resumeButton = add([
        sprite("pause-menu-button"),
        pos(266,70),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "resume",
        scale(3.5)
    ])
    let payButton = add([
        sprite("pause-menu-button"),
        pos(266,270),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "pay",
        scale(3.5)
    ])

    let higher = add([
        sprite("forward"),
        pos(426,208),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "higher",
        scale(3.5)
    ])
    let lower = add([
        sprite("backward"),
        pos(234,208),
        layer("ui"),
        area({
            cursor: "pointer",
        }),
        "lower",
        scale(3.5)
    ])

    clicks("higher", () => {
        if(pA === PLAYER_DATA.DEBT){
            
        } else {
            pA+= 100;
        }
    })
    clicks("lower", () => {
        if(pA === 0){
            
        } else {
            pA-= 100;
        }
    })

    add([ text("Resume"),pos(295,82),layer("ui"),scale(.4)]);
    add([ text("Pay Amount"),pos(285,284),layer("ui"),scale(.3)]);
    add([ text("Debt remaining: $" + PLAYER_DATA.DEBT),pos(160,135),layer("bg"),scale(.4)]);
    add([ text("Days remaining: " + (30 - PLAYER_DATA.GAME_DAY)),pos(160,165),layer("bg"),scale(.4)]);
    add([ text("Pay:"),pos(160,220),layer("bg"),scale(.4)]);
    add([ rect(130,30),pos(295,220),layer('bg')])

    clicks("resume", () => {
        if(PLAYER_DATA.GAME_HOUR > 19 || PLAYER_DATA.GAME_HOUR < 6){
            PLAYER_DATA.ASSETS_NIGHT = false
        } else {
            PLAYER_DATA.ASSETS_NIGHT = true
        }
        _K.go('game-desert',PLAYER_DATA);
    })
    clicks("pay", () => {
        if(pA > PLAYER_DATA.SCORE){
            let much = add([ text("Thats a little too much for you!"),pos(145,344),layer("ui"),scale(.3),"2much"]);
            wait(1, () => {destroy(much)})
        }
        else {
            PLAYER_DATA.DEBT -= pA;
            PLAYER_DATA.SCORE -= pA;
            PLAYER_DATA.XP += (pA / 10);
            if(PLAYER_DATA.GAME_HOUR > 19 || PLAYER_DATA.GAME_HOUR < 6){
                PLAYER_DATA.ASSETS_NIGHT = false
            } else {
                PLAYER_DATA.ASSETS_NIGHT = true
            }
            _K.go('game-desert', PLAYER_DATA);
        }
    })
}