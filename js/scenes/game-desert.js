import _K from '../kaboom.js'

export default function _GAME_DESERT (PLAYER_DATA) {
    //! CHECK IF NEW GAME
    if(!PLAYER_DATA.NEWGAME){
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
        pos(239,111),
        layer('obj'),
        scale(1.8,1.9),
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
    let __CLERK = add([
        sprite('clerk', {
            flipX: true
        }),
        pos(294,269),
        layer('obj'),
        scale(2),
        "clerk"
    ])
    //hide the second gas pump
    every("amount2", (obj) => {obj.hidden = true;})
    //hide the clerk
    __CLERK.hidden = true;


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
    add([
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
    add([
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
    add([
        sprite('shop-button'),
        pos(130,30),
        layer('ui'),
        scale(2,1.6),
        "debt",
        area({
            width: 30,
            height: 16,
            offset: vec2(2,0),
            cursor: 'pointer'
        })
    ])
    add([text("SHOP"),pos(73,33),layer('ui'),scale(.25)]);
    add([text("DEBT"),pos(140,33),layer('ui'),scale(.25)]);
    add([
        sprite("level-bar"),
        pos(139,-10),
        layer('ui'),
        scale(2.5)
    ])
    add([
        rect(43,3),
        scale(2.5),
        layer('ui'),
        pos(165,5),
        color(59,232,245),
        "lvlbar"
    ])
    let UI_LVL = add([
        sprite("level-bar-progress"),
        pos(272,-10),
        layer('ui'),
        scale(2.5),
    ])
    let UI_LVL_COUNT = add([
        text("LVL: " +PLAYER_DATA.LVL),
        pos(166,17),
        layer('ui'),
        scale(.19),
        color(180,232,245),
    ])

    //UPDATE PLAYER XP AND LVL CONSTANTLY
    action("lvlbar", (bar) => {
        bar.width = PLAYER_DATA.XP * .43 / (PLAYER_DATA.LVL/10 + 1)
        UI_LVL.pos.x = Math.floor(bar.pos.x + (bar.width * 2.49));
        if(UI_LVL.pos.x >= 272) {

            PLAYER_DATA.XP -= (100 * (PLAYER_DATA.LVL/10 + 1));
            PLAYER_DATA.LVL++;
            UI_LVL_COUNT.text = "LVL: " +PLAYER_DATA.LVL;

            let lvlplus = add([
                text("LVL +"),
                pos(300,0),
                layer('ui'),
                scale(.3),
                color(180,232,245),
                'lvl-label'
            ])
            wait(.9, () => {
                lvlplus.destroy();
            })
        }
    })

    //SPAWN CARS IN LOOP
    loop(Math.floor((Math.random() * (60 - 22) + 22)), () => {
        if(get("car").length < 3) {
            if(PLAYER_DATA.IS_NIGHT){
                createRandomCarNight();
            }
            else {
                createRandomCar();
            }
        }
    })
    //Lets all Cars drive and destroy cars that drive out of screen
    action("car", (car) => {
        car.move(car.dir.scale(car.speed));
        if (car.pos.x < -150) {
            destroy(car);
            wait(Math.floor(Math.random() * (5 - 1) + 1), () => {
                if(PLAYER_DATA.IS_NIGHT){
                    createRandomCarNight();
                }
                else {
                    createRandomCar();
                }
            })
        }
    })

    //SPAWN FILLER CARS IN LOOP
    loop(Math.floor((Math.random() * (20 - 5) + 5)), () => {
        if(get("filler").length < 2) {
            if(PLAYER_DATA.IS_NIGHT){
                createFillerCarNight();
            }
            else {
                createFillerCar();
            }
        }
    })
    //Lets filler cars drive and destroys them if they drive out of screen
    action("filler", (car) => {
        car.move(car.dir.scale(car.speed));
        if (car.pos.x > 700) {
            destroy(car);
        }
    })

    //! CHANGE SPRITES ACCORDING TO PLAYER INVENTORY (BOUGHT ITEMS)
    const inventory = PLAYER_DATA.INVENTORY.CHAPTER1
    if(inventory[0].amount == 2) {
        every("amount2", (obj) => {obj.hidden = false;});
        __PUMP2.area.height = 50;
        __PUMP2.area.width = 5;
    }
    if(inventory[1].amount == 1) {
        __CLERK.hidden = false;
    }
    if(inventory[3].lvl == 2){
        __DUMPSTER.hidden = true;
    }


    //clock and day/night controller (5secs per hour)
    loop(5, () => { 
        if(PLAYER_DATA.GAME_HOUR === 23){
            PLAYER_DATA.GAME_HOUR = 0;
            PLAYER_DATA.GAME_DAY++;
            UI_CAL.text = PLAYER_DATA.GAME_DAY +'.Day'
        } else {
            PLAYER_DATA.GAME_HOUR++;
        }

        if(PLAYER_DATA.GAME_HOUR > 19 || PLAYER_DATA.GAME_HOUR < 6){
            PLAYER_DATA.IS_NIGHT = true;
            if(!PLAYER_DATA.ASSETS_NIGHT){
                //console.log("Change sprites to night")
                PLAYER_DATA.ASSETS_NIGHT = true;

                __BG.use(sprite("bg-night"));
                __STREET.use(sprite("street-c1-u"+inventory[3].lvl+"-night"));
                __HOUSE.use(sprite("house-c1-u"+inventory[2].lvl+"-night"));
                __DUMPSTER.use(sprite("dumpster-night", {anim:'idle',animSpeed:.6}));
                __PUMP.use(sprite("gp-c1-u"+ inventory[0].lvl +"-night"));
                __PUMP2.use(sprite("gp-c1-u"+ inventory[0].lvl +"-night"));
                every("car", (car)=> {
                    car.stop();
                    if(car.speed != 0) {
                        car.use(sprite(car.type + "-night", {anim:'idle',animSpeed:.4}));
                    }
                    else {
                        car.use(sprite(car.type + "-night"));
                    }
                })
                every("filler", (car)=> {
                    car.stop();
                    car.use(sprite(car.type + "-night", {
                        flipX: true,
                        anim: 'idle', 
                        animSpeed: .4
                    }));
                });
            }
        }
        else if (PLAYER_DATA.GAME_HOUR > 6 || PLAYER_DATA.GAME_HOUR < 19){
            PLAYER_DATA.IS_NIGHT = false;
            if(PLAYER_DATA.ASSETS_NIGHT){
                //console.log("Change sprites to day")
                PLAYER_DATA.ASSETS_NIGHT = false;

                __BG.use(sprite("bg-day"));
                __STREET.use(sprite("street-c1-u"+inventory[3].lvl+"-day"));
                __HOUSE.use(sprite("house-c1-u"+inventory[2].lvl+"-day"));
                __DUMPSTER.use(sprite("dumpster-day", {anim:'idle',animSpeed:.6}));
                __PUMP.use(sprite("gp-c1-u"+ inventory[0].lvl +"-day"));
                __PUMP2.use(sprite("gp-c1-u"+ inventory[0].lvl +"-day"));
                every("car", (car)=> {
                    car.stop();
                    if(car.speed != 0) {
                        car.use(sprite(car.type + "-day", {anim:'idle',animSpeed:.4}));
                    }
                    else {
                        car.use(sprite(car.type + "-day"));
                    }
                })
                every("filler", (car)=> {
                    car.stop();
                    car.use(sprite(car.type + "-day", {
                        flipX: true,
                        anim: 'idle', 
                        animSpeed: .4
                    }));
                })
            }
        }
        UI_CLOCK.text = PLAYER_DATA.GAME_HOUR + ':00 ';
    })


    __PUMP.collides("car", (car) => {
        if(!__PUMP.occupied && Math.random() >= .05){
            car.stop();
            car.speed = 0;
            car.pump = 1;
            __PUMP.occupied = !__PUMP.occupied;
            __PUMP_LIGHT.color = rgb(255,0,0);
        }
    })
    __PUMP2.collides("car", (car) => {
        if(!__PUMP2.occupied && !car.isFueled && Math.random() >= .05){
            car.stop();
            car.speed = 0;
            car.pump = 2;
            __PUMP2.occupied = !__PUMP2.occupied;
            __PUMP2_LIGHT.color = rgb(255,0,0);

            //IF CLERK EXISTS CAR GETS REFUELED AUTOMATICALLY!
            if(PLAYER_DATA.INVENTORY.CHAPTER1[1].amount === 1){
                car.clicked = true;
                console.log("clerk refueles car!")
                wait(2, () => {
                    if(Math.random() <= (0 + (PLAYER_DATA.INVENTORY.CHAPTER1[1].lvl/10))){
                        let PAYMENT

                        if(!car.is("special")) {
                            PAYMENT = Math.floor(Math.floor((Math.random() * (70 - 10) + 10)) * (1 + PLAYER_DATA.LVL/8));
                        } else {
                            PAYMENT = Math.floor(200 * (1 + PLAYER_DATA.LVL/5));
                        }

                        PLAYER_DATA.SCORE += PAYMENT;
            
                        let UI_CLERKLABEL = add([
                            text('$' + PAYMENT),
                            pos(220,260),
                            layer('ui'),
                            scale(.3),
                            area(),
                            color(0,255,0),
                            {
                                dir: vec2(0,-1),
                                speed: 140,
                            }
                        ])
                        UI_CLERKLABEL.action(() => {
                            UI_CLERKLABEL.move(UI_CLERKLABEL.dir.scale(UI_CLERKLABEL.speed));
                        })
                        wait(.4, () => {
                            destroy(UI_CLERKLABEL);
                        })

                        car.isFueled = true;
                        car.clicked = false;
                        car.play("idle", {animSpeed: .4});

                        let emote = add([
                            sprite("game-won"),
                            pos(200,200),
                            scale(1.4),
                            layer('ui'),
                            follow(car, vec2(25,-25))
                        ])
        
                        wait(1.3, () => {
                            destroy(emote);
                        })

                        if(car.is("sport")){
                            car.speed = 200;
                        }
                        else if(car.is("jeep")){
                            car.speed = 180;
                        }
                        else if(car.is("camper")){
                            car.speed = 160;
                        } else {
                            car.speed = 120;
                        }

                        __PUMP2.occupied = !__PUMP2.occupied;
                        __PUMP2_LIGHT.color = rgb(0,255,0);
                        UI_CASHLABEL.text = '$' + PLAYER_DATA.SCORE;
                        PLAYER_DATA.XP += 14;

                    }
                    else {
                        car.isFueled = true;
                        car.clicked = false;
                        car.play("idle", {animSpeed: .4});

                        let emote = add([
                            sprite("game-lost"),
                            pos(200,200),
                            scale(1.4),
                            layer('ui'),
                            follow(car, vec2(25,-25))
                        ])
        
                        wait(1.3, () => {
                            destroy(emote);
                        })

                        if(car.is("sport")){
                            car.speed = 200;
                        }
                        else if(car.is("jeep")){
                            car.speed = 180;
                        }
                        else if(car.is("camper")){
                            car.speed = 160;
                        } else {
                            car.speed = 120;
                        }
                        
                        __PUMP2.occupied = !__PUMP2.occupied;
                        __PUMP2_LIGHT.color = rgb(0,255,0);
                    }
                });
            }
        }
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

            let FUELAM = Math.floor(((Math.random() * (70 - 10) + 10)));
            let PAYMENT

            if(!car.is("special")) {
                PAYMENT = Math.floor(FUELAM * (1 + PLAYER_DATA.LVL/8));
            } else {
                PAYMENT = Math.floor(200 * (1 + PLAYER_DATA.LVL/5));
            }

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
            add([
                text("$"+PAYMENT),
                pos(pump[car.pump-1][0]+75,107),
                layer("ui"),
                scale(.20),
                color(30,30,30),
                "mg"
            ])
            add([
                text(FUELAM + "L"),
                pos(pump[car.pump-1][0]+75,83),
                layer("ui"),
                scale(.2),
                color(30,30,30),
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
                car.play("idle", {animSpeed: .4});

                let emote = add([
                    sprite("game-lost"),
                    pos(200,200),
                    scale(1.4),
                    layer('ui'),
                    follow(car, vec2(25,-25))
                ])

                wait(1.3, () => {
                    destroy(emote);
                })


                if(car.is("sport")){
                    car.speed = 200;
                }
                else if(car.is("jeep")){
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
                car.play("idle", {animSpeed: .4});

                let emote = add([
                    sprite("game-won"),
                    pos(200,200),
                    scale(1.4),
                    layer('ui'),
                    follow(car, vec2(25,-25))
                ])

                wait(1.3, () => {
                    destroy(emote);
                })

                if(car.is("sport")){
                    car.speed = 200;
                }
                else if(car.is("jeep")){
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
                PLAYER_DATA.XP += 14;
            })
        }
    })
    clicks("pause", () => {
        go("pause", PLAYER_DATA);
    })
    clicks("shop", () => {
        go("shop", PLAYER_DATA);
    })
    clicks("debt", () => {
        //go("debt", PLAYER_DATA);
    })
}

//FUCTIONS OoSCOPE
function createRandomCar () {
    if(get("car").length < 3) {
        let random = Math.random();
        if(random >= .98) {
            add([
                sprite("specialcar-day", {
                    anim: "idle",
                    speed: .4
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
                    type: "specialcar"
                }
            ])
        }
        else if(random >= .62) {
            add([
                sprite("camper-day", {
                    anim: "idle",
                    speed: .4
                }),
                pos(600,305),
                layer('obj'),
                scale(1.3),
                area({
                    width: 100,
                    height: 42,
                    offset: vec2(20,0),
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
                    type: "camper"
                }
            ])
        }
        else if(random >= .31) { //.3
            add([
                sprite("jeep-day", {
                    anim: "idle",
                    speed: .4
                }),
                pos(600,305),
                layer('obj'),
                scale(1.3),
                area({
                    width: 100,
                    height: 45,
                    offset: vec2(20,5),
                    cursor: "pointer",
                }),
                "car",
                "jeep",
                {
                    dir: vec2(-1,0),
                    speed: 180,
                    clicked: false,
                    pump: 0,
                    isFueled: false,
                    type: "jeep"
                }
            ])
        }
        else {
            add([
                sprite("sportscar-day", {
                    anim: "idle",
                    speed: .4,
                }),
                pos(600,310),
                layer('obj'),
                scale(1.3),
                area({
                    width: 95,
                    height: 37,
                    offset: vec2(20,0),
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
                    type: "sportscar"
                }
            ])
        }
    }
}

function createRandomCarNight () {
    if(get("car").length < 3) {
        let random = Math.random();
        if(random >= .98) {
            add([
                sprite("specialcar-night", {
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(600,305),
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
                    type: "specialcar"
                }
            ])
        }
        else if(random >= .62) { //.6
            add([
                sprite("camper-night", {
                    anim: "idle",
                    AnimSpeed: .4
                }),
                pos(600,305),
                layer('obj'),
                scale(1.3),
                area({
                    width: 100,
                    height: 42,
                    offset: vec2(20,0),
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
                    type: "camper"
                }
            ])
        }
        else if(random >= .31) { //.3
            add([
                sprite("jeep-night", {
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(600,305),
                layer('obj'),
                scale(1.3),
                area({
                    width: 100,
                    height: 45,
                    offset: vec2(20,5),
                    cursor: "pointer",
                }),
                "car",
                "jeep",
                {
                    dir: vec2(-1,0),
                    speed: 180,
                    clicked: false,
                    pump: 0,
                    isFueled: false,
                    type: "jeep"
                }
            ])
        }
        else {
            add([
                sprite("sportscar-night", {
                    anim: "idle",
                    animSpeed: .4,
                }),
                pos(600,310),
                layer('obj'),
                scale(1.3),
                area({
                    width: 95,
                    height: 37,
                    offset: vec2(20,0),
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
                    type: "sportscar"
                }
            ])
        }
    }
}

function createFillerCar () {
    if(get("filler").length < 2) {
        let random = Math.random();
        if(random >= .93) {
            add([
                sprite("specialcar-day", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(-150,360),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 120,
                    type: "specialcar"
                }
            ])
        }
        else if(random >= .60) {
            add([
                sprite("camper-day", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(-150,340),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 160,
                    type: "camper"
                }
            ])
        }
        else if(random >= .30) {
            add([
                sprite("jeep-day", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(-150,335),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 180,
                    type: "jeep"
                }
            ])
        }
        else {
            add([
                sprite("sportscar-day", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4,
                }),
                pos(-150,350),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 200,
                    type: "sportscar"
                }
            ])
        }
    }
}

function createFillerCarNight () {
    if(get("filler").length < 2) {
        let random = Math.random();
        if(random >= .93) {
            add([
                sprite("specialcar-night", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(-150,360),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 120,
                    type: "specialcar"
                }
            ])
        }
        else if(random >= .60) {
            add([
                sprite("camper-night", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(-150,340),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 160,
                    type: "camper"
                }
            ])
        }
        else if(random >= .30) {
            add([
                sprite("jeep-night", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4
                }),
                pos(-150,335),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 180,
                    type: "jeep"
                }
            ])
        }
        else {
            add([
                sprite("sportscar-night", {
                    flipX: true,
                    anim: "idle",
                    animSpeed: .4,
                }),
                pos(-150,350),
                layer('obj2'),
                scale(1.5),
                "filler",
                {
                    dir: vec2(1,0),
                    speed: 200,
                    type: "sportscar"
                }
            ])
        }
    }
}