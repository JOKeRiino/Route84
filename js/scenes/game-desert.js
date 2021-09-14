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

    layers(['bg', 'obj', 'obj2', 'ui'], 'obj')

    // BG SPRITES
    let __BG = add([
        sprite("bg-day"),
        pos(0,-30),
        layer('bg'),
        scale(1.861,1.191)
    ])
    let __HOUSE = add([
        sprite("house-day"),
        pos(530,120),
        layer('obj'),
        scale(.7),
    ])
    //OBJ1 SPRITES
    let __STREET = add([
        sprite("street-day"),
        pos(0,130),
        layer('obj'),
        scale(.365,.25),
    ])
    let __HYDRANT  = add([
        sprite("hydrant-day"),
        pos(0,269),
        layer('obj'),
        scale(.09,.09),
    ])
    let __PUMP_LIGHT = add([
        rect(10,10),
        color(0,255,0,1),
        pos(451,293),
    ])
    //OBJ2 SPRITES
    let __PUMP = add([
        sprite("pump-day"),
        pos(430,287),
        layer('obj'),
        scale(.09),
        area({
            width: 100,
            height: 500,
            offset: vec2(0,0)
        }),
        "pump",
        {
            occupied: false,
        }
    ])
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
    const cashlabel = add([
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
    const UI_AVATAR = add([
        sprite("avatar", {
            flipY: true
        }),
        pos(-5,-10),
        scale(2.5)
    ])

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
    loop(60, ()=> {
        if(PLAYER_DATA.DAY_NIGHT_COUNT % 2 === 0) {
            PLAYER_DATA.DAY_NIGHT_COUNT++;
            __BG.use(sprite("bg-night"));
            __STREET.use(sprite("street-night"));
            __HYDRANT.use(sprite("hydrant-night"));
            __HOUSE.use(sprite("house-night"));
            __PUMP.use(sprite("pump-night"));
        }
        else {
            PLAYER_DATA.DAY_NIGHT_COUNT++;
            __BG.use(sprite("bg-day"));
            __STREET.use(sprite("street-day"));
            __HYDRANT.use(sprite("hydrant-day"));
            __HOUSE.use(sprite("house-day"));
            __PUMP.use(sprite("pump-day"));
        }
    })
    //clock controller (5secs per hour)
    loop(5, () => { 
        if(PLAYER_DATA.GAME_HOUR === 23){
            PLAYER_DATA.GAME_HOUR = 0;
            PLAYER_DATA.GAME_DAY++;
        } else {
            PLAYER_DATA.GAME_HOUR++;
        }
        UI_CLOCK.text = PLAYER_DATA.GAME_HOUR + ':00 ';
    })

    __PUMP.collides("car", (car) => {
        if(!__PUMP.occupied && Math.random() >= .5){
            car.speed = 0;
            __PUMP.occupied = !__PUMP.occupied;
            __PUMP_LIGHT.color = rgb(255,0,0);
        }
    })
    __HITBOX.collides("car", (car) => {
        destroy(car);
        wait(Math.floor(Math.random() * (5 - 1) + 1), () => {
            createRandomCar();
        })
    })

    clicks("car", (car) => {
        if(car.speed == 0) {
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
    })
    clicks("pause", () => {
        go("pause", PLAYER_DATA);
    })
}

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