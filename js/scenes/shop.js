import _K from '../kaboom.js'

export default function _SHOP (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')

    let pD = PLAYER_DATA.SHOPITEMS.CHAPTER1;

    add([rect(700,400),color(40,40,80),layer('bg')]);
    add([ text("SHOP"),pos(310,20),layer("bg"),scale(.4)]);
    add([
        sprite("avatar", {
            flipY: true
        }),
        pos(-5,-10),
        scale(2.5)
    ])
    add([
        sprite("jacob"),
        pos(4,2),
        scale(.205),
        layer("ui")
    ])
    add([
        sprite("shopkeeper", {
            flipX: true
        }),
        pos(570,245),
        scale(.6),
        layer("ui")
    ])
    add([
        sprite('shop-button'),
        pos(63,30),
        layer('ui'),
        scale(2,1.6),
        "back",
        area({
            width: 30,
            height: 16,
            offset: vec2(2,0),
            cursor: 'pointer'
        })
    ])
    add([text("BACK"),pos(73,33),layer('ui'),scale(.25)]);
    add([
        sprite("cash-label"),
        pos(57,-2),
        scale(2.6)
    ])
    const UI_CASHLABEL = add([
        text('$' + PLAYER_DATA.SCORE),
        pos(85,5),
        layer('ui'),
        scale(.23),
        "cash",
        {
            value: PLAYER_DATA.SCORE
        }
    ])

    //SHOP BUTTONS
    add([
        sprite("pause-menu-button"),
        pos(70,100),
        layer("ui"),
        area({
            width: 46,
            height: 14,
            offset: vec2(6,2),
            cursor: "pointer",
        }),
        "shopbutton",
        "sb_1",
        scale(5,3.5),
        {
            index: 0,
            cost: pD[0].price,
            available: pD[0].available
        }
    ])
    add([
        sprite("pause-menu-button"),
        pos(70,155),
        layer("ui"),
        area({
            width: 46,
            height: 14,
            offset: vec2(6,2),
            cursor: "pointer",
        }),
        "shopbutton",
        "sb_2",
        scale(5,3.5),
        {
            index: 1,
            cost: pD[1].price,
            available: pD[1].available
        }
    ])
    add([
        sprite("pause-menu-button"),
        pos(70,210),
        layer("ui"),
        area({
            width: 46,
            height: 14,
            offset: vec2(6,2),
            cursor: "pointer",
        }),
        "shopbutton",
        "sb_3",
        scale(5,3.5),
        {
            index: 2,
            cost: pD[2].price,
            available: pD[2].available,
        }
    ])
    add([
        sprite("pause-menu-button"),
        pos(70,265),
        layer("ui"),
        area({
            width: 46,
            height: 14,
            offset: vec2(6,2),
            cursor: "pointer",
        }),
        "shopbutton",
        "sb_4",
        scale(5,3.5),
        {
            index: 3,
            cost: pD[3].price,
            available: pD[3].available
        }
    ])
    add([
        sprite("pause-menu-button"),
        pos(390,100),
        layer("ui"),
        area({
            width: 46,
            height: 14,
            offset: vec2(6,2),
            cursor: "pointer",
        }),
        "shopbutton",
        "sb_5",
        scale(5,3.5),
        {
            index: 4,
            cost: pD[4].price,
            available: pD[4].available
        }
    ])
    
    //SHOP ITEM TEXTS
    add([
        text(pD[0].name + "\n$" + pD[0].price + "         (" + pD[0].available + "x)"),
        layer("ui"),
        pos(130,112),
        scale(.2)
    ])
    add([
        text(pD[1].name + "\n$" + pD[1].price + "         (" + pD[1].available + "x)"),
        layer("ui"),
        pos(130,167),
        scale(.2)
    ])
    add([
        text(pD[2].name + "\n$" + pD[2].price + "          (" + pD[2].available + "x)"),
        layer("ui"),
        pos(130,222),
        scale(.2)
    ])
    add([
        text(pD[3].name + "\n$" + pD[3].price + "        (" + pD[3].available + "x)"),
        layer("ui"),
        pos(130,277),
        scale(.2)
    ])
    add([
        text(pD[4].name + "\n$" + pD[4].price + "          (" + pD[4].available + "x)"),
        layer("ui"),
        pos(450,112),
        scale(.2)
    ])

    purchaseText("Shopkeeper (Pete)\n\nWelcome to\nmy shop!")

    //UPDATE IF ITEM IS PURCHASEABLE OR NOT
    action("shopbutton", (sb) => {
        if(sb.available === 0) {
            sb.color = rgb(0,0,0,.3)
        }
        
        if(PLAYER_DATA.SCORE < sb.cost && sb.available > 0){
            sb.color = rgb(255,0,0,.3)
        }
        
        if(PLAYER_DATA.SCORE >= sb.cost && sb.available > 0){
            sb.color = rgb(0,255,0,.3)
        }
    })

    //UPDATE CASH CONSTANTLY
    action("cash", (ui) => {
        ui.text = '$' + PLAYER_DATA.SCORE;
    })

    //BUY ACTIONS
    clicks("shopbutton", (button) => {
        let index = button.index;

        if(PLAYER_DATA.SCORE >= button.cost && button.available > 0){
            PLAYER_DATA.SCORE -= button.cost;
            //TODO Hier kommen die dinge hin die sich verändern nach dem kauf!
            pD[index].available -= 1;
            purchaseText("Shopkeeper (Pete)\n\nThank you!")
            wait(.5, () => {
                _K.go('game-desert',PLAYER_DATA);
            })
        }
        else if(button.available == 0) {
            purchaseText("Shopkeeper (Pete)\n\nYou already\nown this!");
        }
        else if(PLAYER_DATA.SCORE < button.cost) {
            purchaseText("Shopkeeper:\n\nThis item is\ntoo expensive!");
        }
    })


    clicks("back", () => {
        _K.go('game-desert',PLAYER_DATA);
    })

    function purchaseText (word) {
        let speech = add([
            sprite("speech"),
            pos(400,165),
            scale(.5,.4),
            layer("ui"),
            color(69,128,173)
        ])
        let txt = add([text(word, {size: 20, outline: 0}),pos(410,175),layer("ui"),scale(1),]);
        wait(1.5, () => {
            destroy(txt);
            destroy(speech);
        })
    }
}