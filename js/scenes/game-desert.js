import _K from '../kaboom.js'

export default function _GAME_DESERT (PLAYER_DATA) {
    //! CHECK IF NEW GAME
    if(!PLAYER_DATA.NEWGAME){
        PLAYER_DATA.DAY_NIGHT_COUNT--;
        PLAYER_DATA.GAME_HOUR--;
    }
    if(PLAYER_DATA.NEWGAME){
        PLAYER_DATA.NEWGAME = false;
    }

    gravity(950);
    layers(['bg', 'obj', 'obj2', 'ui'], 'obj')  

    //BG SPRITES
    let __BG = add([
        sprite("bg-day"),
        pos(0,-30),
        layer('bg'),
        scale(1.861,1.191)
    ])
    let __HOUSE = add([
        sprite("house-c1-u1-day"),
        pos(239,124),
        layer('obj'),
        scale(1.8),
    ])

    //OBJ1 SPRITES
    let __STREET = add([
        sprite("street-c1-u1-night"),
        pos(0,330),
        layer('obj'),
        scale(1),
    ])
    let __DUMPSTER = add([
        sprite("dumpster-day", {
            anim: 'idle',
            animSpeed: .6
        }),
        pos(130,268),
        scale(1.2),
        layer('obj'),
    ])
    let __PUMP_LIGHT = add([
        rect(12,12),
        color(0,255,0,1),
        pos(456,272),
    ])
    //OBJ2 SPRITES
    let __PUMP = add([
        sprite("gp-c1-u1-day"),
        pos(430,270),
        layer('obj'),
        scale(1),
        area({
            width: 5,
            height: 50,
            offset: vec2(0,17)
        }),
        "pump",
        {
            occupied: false,
        }
    ])
    let __PUMP2_LIGHT = add([
        rect(12,12),
        color(0,255,0,1),
        pos(276,272),
        "amount2",
    ])
    let __PUMP2 = add([
        sprite("gp-c1-u1-day"),
        pos(250,270),
        layer('obj'),
        scale(1),
        area({
            width: 0,
            height: 0,
            offset: vec2(0,17)
        }),
        "pump",
        "amount2",
        {
            occupied: false,
        }
    ])
    //hide the second gas pumps
    every("amount2", (obj) => {obj.hidden = true;})
    //!PATCH THIS OUT!!! :
    let __HITBOX = add([
        rect(1,80),
        pos(-150,300),
        color(1,1,1,1),
        layer('obj'),
        area(),
        "wall"
    ])


    //UI SPRITES
    const UI_CLOCK = add([
        text(PLAYER_DATA.GAME_HOUR + ':00 ', {
            width: 70
        }),
        pos(625,5),
        layer('ui'),
        scale(.3),
        {
            value: PLAYER_DATA.GAME_HOUR
        }

    ])
    const UI_CAL = add([
        text(PLAYER_DATA.GAME_DAY + '.Day', {
            width: 70
        }),
        pos(625,27),
        layer('ui'),
        scale(.25),
        {
            value: PLAYER_DATA.GAME_DAY
        }

    ])
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
        {
            value: PLAYER_DATA.SCORE
        }
    ])
    const UI_PAUSE = add([
        sprite('pause-button'),
        pos(580,0),
        layer('ui'),
        scale(1.4),
        "pause",
        area({
            width: 21,
            height: 21,
            offset: vec2(8,8),
            cursor: "pointer",
        }),
    ])
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
    const UI_SHOP = add([
        sprite('shop-button'),
        pos(63,30),
        layer('ui'),
        scale(2,1.6),
        "shop",
        area({
            width: 30,
            height: 16,
            offset: vec2(2,0),
            cursor: 'pointer'
        })
    ])
    add([text("SHOP"),pos(73,33),layer('ui'),scale(.25)]);

    //SPAWN CARS IN LOOP
    loop(Math.floor((Math.random() * (60 - 22) + 22)), () => {
        if(get("car").length < 3) {
            createRandomCar();
        }
    })
    //Lets all Cars drive
    action("car", (car) => {
        car.move(car.dir.scale(car.speed));
    })

    //SPAWN FILLER CARS IN LOOP
    loop(Math.floor((Math.random() * (20 - 5) + 5)), () => {
        if(get("filler").length < 2) {
            createFillerCar();
        }
    })
    //Lets filler cars drive and destroys them
    action("filler", (car) => {
        car.move(car.dir.scale(car.speed));
        if (car.pos.x > 700) {
            destroy(car);
        }
    })

    //day-night-cycle (60secs)
    //! CHANGE SPRITES ACCORDING TO PLAYER INVENTORY (BOUGHT ITEMS)
    const inventory = PLAYER_DATA.INVENTORY.CHAPTER1
    if(inventory[0].amount == 2) {
        every("amount2", (obj) => {obj.hidden = false;});
        __PUMP2.area.height = 50;
        __PUMP2.area.width = 5;
    }
    if(inventory[3].lvl == 2){
        __DUMPSTER.hidden = true;
    }

    loop(60, ()=> {
        if(PLAYER_DATA.DAY_NIGHT_COUNT % 2 === 0) {
            PLAYER_DATA.DAY_NIGHT_COUNT++;
            __BG.use(sprite("bg-night"));
            __STREET.use(sprite("street-c1-u"+inventory[3].lvl+"-night"));
            __HOUSE.use(sprite("house-c1-u"+inventory[2].lvl+"-night"));
            __DUMPSTER.use(sprite("dumpster-night", {anim:'idle',animSpeed:.6}));
            __PUMP.use(sprite("gp-c1-u"+ inventory[0].lvl +"-night"));
            __PUMP2.use(sprite("gp-c1-u"+ inventory[0].lvl +"-night"));
        }
        else {
            PLAYER_DATA.DAY_NIGHT_COUNT++;
            __BG.use(sprite("bg-day"));
            __STREET.use(sprite("street-c1-u"+inventory[3].lvl+"-day"));
            __HOUSE.use(sprite("house-c1-u"+inventory[2].lvl+"-day"));
            __DUMPSTER.use(sprite("dumpster-day", {anim:'idle',animSpeed:.6}));
            __PUMP.use(sprite("gp-c1-u"+ inventory[0].lvl +"-day"));
            __PUMP2.use(sprite("gp-c1-u"+ inventory[0].lvl +"-day"));
        }
    })
    //clock controller (5secs per hour)
    loop(5, () => { 
        if(PLAYER_DATA.GAME_HOUR === 23){
            PLAYER_DATA.GAME_HOUR = 0;
            PLAYER_DATA.GAME_DAY++;
            UI_CAL.text = PLAYER_DATA.GAME_DAY +'.Day'
        } else {
            PLAYER_DATA.GAME_HOUR++;
        }
        UI_CLOCK.text = PLAYER_DATA.GAME_HOUR + ':00 ';
    })

    __PUMP.collides("car", (car) => {
        if(!__PUMP.occupied && Math.random() >= .05){
            car.speed = 0;
            car.pump = 1;
            __PUMP.occupied = !__PUMP.occupied;
            __PUMP_LIGHT.color = rgb(255,0,0);
        }
    })
    __PUMP2.collides("car", (car) => {
        if(!__PUMP2.occupied && !car.isFueled && Math.random() >= .05){
            car.speed = 0;
            car.pump = 2;
            __PUMP2.occupied = !__PUMP2.occupied;
            __PUMP2_LIGHT.color = rgb(255,0,0);
        }
    })

    __HITBOX.collides("car", (car) => {
        destroy(car);
        wait(Math.floor(Math.random() * (5 - 1) + 1), () => {
            createRandomCar();
        })
    })

    //CLICK LISTENERS
    clicks("car", (car) => {
        if(car.speed == 0 && car.clicked == false) {
            car.clicked = true;
            //!MINIGAME:
            let pump = [
                [380,390,391,420],
                [180,190,191,220],
            ]

            //? MINIGAME SPRITES
            let tankceil = add([
                rect(40,2),
                pos(pump[car.pump-1][1],68),
                solid(),
                layer('ui'),
                area(),
                "border",
                "mg"
            ])
            let tankfloor = add([
                rect(40,2),
                color(40,40,80),
                pos(pump[car.pump-1][1],270),
                solid(),
                layer('ui'),
                area(),
                "border",
                "mg"
            ])
            let tanksize = add([
                rect(40,200),
                pos(pump[car.pump-1][1],70),
                color(255,255,255),
                layer("ui"),
                "mg"
            ])
            let goal = add([
                rect(38, Math.floor(Math.random() * (35 - 20) + 20)),
                pos(pump[car.pump-1][2], Math.floor(Math.random() * (150 - 75) + 75)),
                layer('ui'),
                color(0,240,0),
                area(),
                health(10),
                "mg",
                "goal",
            ])
            let progress = add([
                rect(38,12),
                pos(pump[car.pump-1][2],150),
                color(247,200,29),
                opacity(.8),
                layer('ui'),
                "progress",
                "mg"
            ])
            let fuel = add([
                rect(38,3),
                pos(pump[car.pump-1][2],205),
                color(247,200,29),
                layer('ui'),
                area({
                    height: 1,
                    width: 20,
                    offset: vec2(9,-1)
                }),
                body(),
                "mg",
                "fuel"
            ])
            let mini_bg = add([
                sprite("mini-bg"),
                pos(pump[car.pump-1][0],60),
                layer("ui"),
                "mg"
            ])
            //? UPDATE THE PROGRESS BAR
            action("progress", (obj) => {
                let fuelY = fuel.pos.y
                obj.pos.y = fuelY;
                obj.height = 270 - obj.pos.y
            })
            // RAISE THE FUEL BAR ON SPACE-PRESS
            function jump() {
                fuel.jump(130);
            }
            keyPress("space", jump);
            //! CHECK THE STATUS OF THE GOAL
            loop(.2, () => {            
                    if (fuel.isColliding(goal)) {
                        goal.hurt(1);
                    }
            });
            // LOSE THE GAME IF FUEL HITS THE UPPER OR LOWER BORDER
            fuel.collides("border", () => {
                console.log("game lost");
                every("mg", destroy);

                car.isFueled = true;
                car.clicked = false;
                if(car.is("sport")){
                    car.speed = 200;
                }
                else if(car.is("sedan")){
                    car.speed = 180;
                }
                else if(car.is("camper")){
                    car.speed = 160;
                } else {
                    car.speed = 120;
                }

                if(car.pump == 1){
                    __PUMP.occupied = !__PUMP.occupied;
                    __PUMP_LIGHT.color = rgb(0,255,0);
                }
                else if(car.pump = 2){
                    __PUMP2.occupied = !__PUMP2.occupied;
                    __PUMP2_LIGHT.color = rgb(0,255,0);
                }
            })
            //! END THE GAME IF THE LIFE OF GOAL GETS SMALLER THAN 1
            goal.on("death", () => {
                every("mg", destroy);
                console.log("game won");
                let PAYMENT

                if(!car.is("special")) {
                    PAYMENT = Math.floor((Math.random() * (65 - 12) + 12));
                } else {
                    PAYMENT = 200;
                }
                PLAYER_DATA.SCORE += PAYMENT;
            
                let UI_PAYMENTLABEL = add([
                    text('$' + PAYMENT),
                    pos(pump[car.pump-1][3],260),
                    layer('ui'),
                    scale(.3),
                    area(),
                    color(0,255,0),
                    {
                        dir: vec2(0,-1),
                        speed: 140,
                    }
                ])
                UI_PAYMENTLABEL.action(() => {
                    UI_PAYMENTLABEL.move(UI_PAYMENTLABEL.dir.scale(UI_PAYMENTLABEL.speed));
                })
                wait(.4, () => {
                    destroy(UI_PAYMENTLABEL);
                })

                car.isFueled = true;
                car.clicked = false;

                if(car.is("sport")){
                    car.speed = 200;
                }
                else if(car.is("sedan")){
                    car.speed = 180;
                }
                else if(car.is("camper")){
                    car.speed = 160;
                } else {
                    car.speed = 120;
                }
                if(car.pump == 1) {
                    __PUMP.occupied = !__PUMP.occupied;
                    __PUMP_LIGHT.color = rgb(0,255,0);
                }
                else if(car.pump == 2) {
                    __PUMP2.occupied = !__PUMP2.occupied;
                    __PUMP2_LIGHT.color = rgb(0,255,0);
                }
                UI_CASHLABEL.text = '$' + PLAYER_DATA.SCORE;
            })
        }
    })
    clicks("pause", () => {
        go("pause", PLAYER_DATA);
    })
    clicks("shop", () => {
        go("shop", PLAYER_DATA);
    })

    //FUNCTIONS IN SCOPE
    
    function winGame(car) {

        let PAYMENT
        if(!car.is("special")) {
            PAYMENT = Math.floor((Math.random() * (65 - 12) + 12));
        } else {
            PAYMENT = 200;
        }
        PLAYER_DATA.SCORE += PAYMENT;
    
        let UI_PAYMENTLABEL = add([
            text('$' + PAYMENT),
            pos(420,260),
            layer('ui'),
            scale(.3),
            area(),
            color(0,255,0),
            {
                dir: vec2(0,-1),
                speed: 140,
            }
        ])
        UI_PAYMENTLABEL.action(() => {
            UI_PAYMENTLABEL.move(UI_PAYMENTLABEL.dir.scale(UI_PAYMENTLABEL.speed));
        })
        wait(.4, () => {
            destroy(UI_PAYMENTLABEL);
        })
        
        if(car.is("sport")){
            car.speed = 200;
        }
        else if(car.is("sedan")){
            car.speed = 180;
        }
        else if(car.is("camper")){
            car.speed = 160;
        } else {
            car.speed = 120;
        }
        __PUMP.occupied = !__PUMP.occupied;
        __PUMP_LIGHT.color = rgb(0,255,0);
        UI_CASHLABEL.text = '$' + PLAYER_DATA.SCORE;
    }
}

//FUCTIONS OoSCOPE
function createRandomCar () {
    if(get("car").length < 3) {
        let random = Math.random();
        if(random >= .97) {
            add([
                sprite("special-car", {
                    anim: "drive",
                    animSpeed: .4
                }),
                pos(600,320),
                layer('obj'),
                scale(1.3),
                area({
                    width: 100,
                    height: 38,
                    offset: vec2(15,0),
                    cursor: "pointer",
                }),
                "car",
                "special",
                {
                    dir: vec2(-1,0),
                    speed: 120,
                    clicked: false,
                    pump: 0,
                    isFueled: false,
                }
            ])
        }
        else if(random >= .6) {
            add([
                sprite("camper"),
                pos(600,297),
                layer('obj'),
                scale(.50),
                area({
                    width: 245,
                    height: 120,
                    offset: vec2(20,10),
                    cursor: "pointer",
                }),
                "car",
                "camper",
                {
                    dir: vec2(-1,0),
                    speed: 160,
                    clicked: false,
                    pump: 0,
                    isFueled: false,
                }
            ])
        }
        else if(random >= .3) {
            add([
                sprite("sedan"),
                pos(600,285),
                layer('obj'),
                scale(.6),
                area({
                    width: 230,
                    height: 90,
                    offset: vec2(20,30),
                    cursor: "pointer",
                }),
                "car",
                "sedan",
                {
                    dir: vec2(-1,0),
                    speed: 180,
                    clicked: false,
                    pump: 0,
                    isFueled: false,
                }
            ])
        }
        else {
            add([
                sprite("sportscar"),
                pos(600,280),
                layer('obj'),
                scale(.6),
                area({
                    width: 250,
                    height: 100,
                    offset: vec2(20,30),
                    cursor: "pointer",
                }),
                "car",
                "sport",
                {
                    dir: vec2(-1,0),
                    speed: 200,
                    clicked: false,
                    pump: 0,
                    isFueled: false,
                }
            ])
        }
    }
}

function createFillerCar () {
    if(get("filler").length < 2) {
        let random = Math.random();
        if(random >= .97) {
            add([
                sprite("special-car", {
                    flipX: true,
                    anim: "drive",
                    animSpeed: .4
                }),
                pos(-150,360),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 120,
                }
            ])
        }
        else if(random >= .6) {
            add([
                sprite("camper", {
                    flipX: true,
                }),
                pos(-150,340),
                layer('obj2'),
                scale(.60),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 160,
                }
            ])
        }
        else if(random >= .3) {
            add([
                sprite("sedan", {
                    flipX: true,
                }),
                pos(-150,320),
                layer('obj2'),
                scale(.75),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 180,
                }
            ])
        }
        else {
            add([
                sprite("sportscar", {
                    flipX: true,
                }),
                pos(-150,310),
                layer('obj2'),
                scale(.7),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 200,
                }
            ])
        }
    }
}