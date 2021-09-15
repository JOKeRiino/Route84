import _K from "./js/kaboom.js"

import _GAME_DESERT from "./js/scenes/game-desert.js";
import _HOME from "./js/scenes/home.js";
import _PAUSE from "./js/scenes/pause.js";

const PLAYER_DATA = {
    'NEWGAME': true,
    'SCORE' : 0,
    'DAY_NIGHT_COUNT': 1,
    'GAME_HOUR' : 5,
    'GAME_DAY' : 1, 
    'LVL' : 0,
    'XP': 0,
    'PUMPS' : 1,
}
//_K.debug.inspect = true;

// LOAD ASSETS
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

loadSprite('sportscar', 'src/cars/sportscar-night.png');
loadSprite('camper', 'src/cars/spr_camper_0.png');
loadSprite('sedan', 'src/cars/spr_bluecar_0.png');
loadSprite('special-car', 'src/cars/cargo.png', {
    sliceX: 2,
    sliceY: 0,
    anims: { drive: { from: 0, to: 1, loop: true }, },
});
loadSprite('home-bg', 'src/backgrounds/ezgif.com-gif-maker.png', {
    sliceX: 5,
    sliceY: 4,
    anims: { idle: { from: 0, to: 15, loop: true}, },
});
//UI Sprite Atlas
loadSpriteAtlas("src/gui/GUI.png", {
    "pause-button": {
        x: 160,
        y: 32,
        width: 32,
        height: 32
    },
    "pause-menu": {
        x: 0,
        y: 32,
        width: 48,
        height: 48
    },
    "pause-menu-button": {
        x: 144,
        y: 80,
        width: 48,
        height: 16
    },
    "home-menu-button": {
        x: 144,
        y: 112,
        width: 48,
        height: 16
    },
    "avatar": {
        x:95,
        y:32,
        width: 27,
        height: 32
    },
    "cash-label": {
        x: 119,
        y: 48,
        width: 48,
        height: 16
    }
})

//ALL SCENES
_K.scene('game-desert', _GAME_DESERT);
_K.scene('pause', _PAUSE);
_K.scene('home', _HOME);

_K.go('home',PLAYER_DATA);
