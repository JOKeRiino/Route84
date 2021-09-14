import kaboom from "https://unpkg.com/kaboom@next/dist/kaboom.mjs";

var SCORE = 0;
var dayNightCount = 1;
var gameHour = 5;
var gameDay = 1;


// initialize context
kaboom({
    global: true,
    fullscreen: false,
    width: 700,
    height: 400,
    scale: 1,
    debug: true,
});

//debug.inspect = true;

// load assets
loadSprite('bg-day', 'src/backgrounds/finalDay.PNG');
loadSprite('bg-night', 'src/backgrounds/finalNight.PNG');
loadSprite('street-night', 'src/street/road&border.png');
loadSprite('street-day', 'src/street/road&borderpale.png');
loadSprite('hydrant-night', 'src/street/wheels&hydrant.png');
loadSprite('hydrant-day', 'src/street/wheels&hydrantpale.png');
loadSprite('house-day', 'src/house/house-day.png');
loadSprite('house-night', 'src/house/house-night.png');
loadSprite('pump-day', 'src/assets/pump-day.png');
loadSprite('pump-night', 'src/assets/pump-night.png');
//cars
loadSprite('sportscar', 'src/cars/sportscar-night.png');
loadSprite('camper', 'src/cars/spr_camper_0.png');
loadSprite('sedan', 'src/cars/spr_bluecar_0.png');
loadSprite('special-car', 'src/cars/cargo.png', {
    sliceX: 2,
    sliceY: 0,
    anims: { drive: { from: 0, to: 1, loop: true }, },
});

// scenes
scene("game", () => {
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
    const __CLOCK = add([
        text(gameHour + ':00 '),
        pos(625,5),
        layer('ui'),
        scale(.3),
        {
            value: gameHour
        }

    ])

    const UI_CASHLABEL = add([
        text('Cash: $' + SCORE),
        pos(5, 5),
        layer('ui'),
        scale(.3),
        {
            value: SCORE
        }
    ])

    //SPAWN CARS IN LOOP
    loop(Math.floor((Math.random() * (60 - 22) + 22)), () => {
        console.log("loopcar created")
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
        console.log("loopcar created")
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
        if(dayNightCount % 2 === 0) {
            dayNightCount++;
            __BG.use(sprite("bg-night"));
            __STREET.use(sprite("street-night"));
            __HYDRANT.use(sprite("hydrant-night"));
            __HOUSE.use(sprite("house-night"));
            __PUMP.use(sprite("pump-night"));
        }
        else {
            dayNightCount++;
            __BG.use(sprite("bg-day"));
            __STREET.use(sprite("street-day"));
            __HYDRANT.use(sprite("hydrant-day"));
            __HOUSE.use(sprite("house-day"));
            __PUMP.use(sprite("pump-day"));
        }
    })

    //clock controller (5secs per hour)
    loop(5, () => { 
        if(gameHour === 23){
            gameHour = 0;
            gameDay++;
            console.log("Day: " + gameDay);
        } else {
            gameHour++;
        }
        __CLOCK.text = gameHour + ':00 ';
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
            console.log(car)
            let PAYMENT
            if(!car.is("special")) {
                PAYMENT = Math.floor((Math.random() * (65 - 12) + 12));
            } else {
                PAYMENT = 200;
            }
            SCORE = SCORE + PAYMENT;

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
            UI_CASHLABEL.text = 'Cash: $' + SCORE;
        }
    })
})

go("game");




function createRandomCar () {
    if(get("car").length < 3) {
        let random = Math.random();
        console.log(random);
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