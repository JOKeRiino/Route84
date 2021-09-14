import kaboom from "https://unpkg.com/kaboom@next/dist/kaboom.mjs";

var SCORE = 0;
var dayNightCount = 1;
var gameHour = 5;


// initialize context
kaboom({
    global: true,
    fullscreen: false,
    width: 700,
    height: 400,
    scale: 1,
    debug: true,
});

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
loadSprite('sportscar-day', 'src/cars/sportscar-day.png');
loadSprite('sportscar-night', 'src/cars/sportscar-night.png');

// scenes
scene("game", () => {
    layers(['bg', 'obj', 'obj2', 'ui'], 'obj')

    // BG SPRITES
    let bgNight = add([
        sprite("bg-night"),
        pos(0,-30),
        layer('bg'),
        scale(1.861,1.191)
    ])

    //console.log(bgNight);

    let bgDay = add([
        sprite("bg-day"),
        pos(0,-30),
        layer('bg'),
        scale(1.861,1.191)
    ])

    let houseNight = add([
        sprite("house-night"),
        pos(530,120),
        layer('obj'),
        scale(.7),
    ])

    let houseDay = add([
        sprite("house-day"),
        pos(530,120),
        layer('obj'),
        scale(.7),
    ])

    //OBJ1 SPRITES
    let streetNight = add([
        sprite("street-night"),
        pos(0,130),
        layer('obj'),
        scale(.365,.25),
    ])

    let streetDay = add([
        sprite("street-day"),
        pos(0,130),
        layer('obj'),
        scale(.365,.25),
    ])

    let hydrantNight = add([
        sprite("hydrant-night"),
        pos(0,269),
        layer('obj'),
        scale(.09,.09),
    ])

    let hydrantDay = add([
        sprite("hydrant-day"),
        pos(0,269),
        layer('obj'),
        scale(.09,.09),
    ])

    //OBJ2 SPRITES
    let pumpNight = add([
        sprite("pump-night"),
        pos(430,287),
        layer('obj'),
        scale(.09),
        area(),
        "pump",
        {
            occupied: false,
        }
    ])

    let pumpDay = add([
        sprite("pump-day"),
        pos(430,287),
        layer('obj'),
        scale(.09),
        area(),
        "pump",
        {
            occupied: false,
        }
    ])

    let hitBox = add([
        rect(1,80),
        pos(-150,300),
        color(1,1,1,1),
        layer('obj'),
        area(),
        "wall"
    ])

    createSportsCar();

    //UI SPRITES
    const clock = add([
        text(gameHour + ':00 '),
        pos(625,5),
        layer('ui'),
        scale(.3),
        {
            value: gameHour
        }

    ])

    const cashLabel = add([
        text('Cash: $' + SCORE),
        pos(5, 5),
        layer('ui'),
        scale(.3),
        {
            value: SCORE
        }
    ])

    //day-night-cycle (60secs)
    loop(24, ()=> {
        if(dayNightCount % 2 === 0) {
            dayNightCount++;
            bgDay.hidden = true;
            streetDay.hidden = true;
            hydrantDay.hidden = true;
            houseDay.hidden = true;
            pumpDay.hidden = true;
        }
        else {
            dayNightCount++;
            bgDay.hidden = false;
            streetDay.hidden = false;
            hydrantDay.hidden = false;
            houseDay.hidden = false;
            pumpDay.hidden = false;
        }
    })

    //clock controller (5secs per hour)
    loop(2, () => { 
        if(gameHour === 23){
            gameHour = 0;
        } else {
            gameHour++;
        }
        clock.text = gameHour + ':00 ';
    })


    pumpNight.collides("car", (car) => {
        if(!pumpNight.occupied && Math.random() >= .5){
            car.speed = 0;
            pumpNight.occupied = !pumpNight.occupied;
        }
    })

    pumpDay.collides("car", (car) => {
        if(!pumpDay.occupied && Math.random() >= .5){
            car.speed = 0;
            pumpDay.occupied = !pumpDay.occupied;
        }
    })

    hitBox.collides("car", (car) => {
        destroy(car);
        wait(Math.floor(Math.random() * (5 - 1) + 1), () => {
            createSportsCar();
        })
    })

    clicks("car", (car) => {
        if(car.speed == 0) {
            let PAYMENT = Math.floor((Math.random() * (65 - 12) + 12));
            SCORE = SCORE + PAYMENT;

            let paymentLabel = add([
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
            paymentLabel.action(() => {
                paymentLabel.move(paymentLabel.dir.scale(paymentLabel.speed));
            })
            wait(.4, () => {
                destroy(paymentLabel);
            })

            car.speed = 120;
            pumpNight.occupied = !pumpNight.occupied;
            pumpDay.occupied = !pumpDay.occupied;
            cashLabel.text = 'Cash: $' + SCORE;
        }
    })
})

go("game");




function createSportsCar () {
    let sportscarNight = add([
        sprite("sportscar-night"),
        pos(600,280),
        layer('obj'),
        scale(.6),
        area(),
        "car",
        {
            dir: vec2(-1,0),
            speed: 100,
        }
    ])
    sportscarNight.action(() => {
        sportscarNight.move(sportscarNight.dir.scale(sportscarNight.speed));
    })
}