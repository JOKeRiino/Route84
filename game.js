import _K from "./js/kaboom.js"

import _GAME_DESERT from "./js/scenes/game-desert.js";
import _HOME from "./js/scenes/home.js";
import _PAUSE from "./js/scenes/pause.js";
import _SHOP from "./js/scenes/shop.js";
import _TUTORIAL from "./js/scenes/tutorial.js";
import _STORY from "./js/scenes/story.js";
import _DEBT from "./js/scenes/debt.js";
import _GAMEEND from "./js/scenes/game-end.js";
import _GAMEOVER from "./js/scenes/game-over.js";

const PLAYER_DATA = {
    'NEWGAME': true,
    'SCORE' : 196,
    'IS_NIGHT': false,
    'ASSETS_NIGHT': false,
    'GAME_HOUR' : 5,//5
    'GAME_DAY' : 1,
    'LVL' : 1,
    'XP': 0,
    'DEBT': 23000,
    'TUTORIAL': true,
    'ITEMSBOUGHT': 0,
    'INVENTORY': {
        'CHAPTER1' : [
            { //pumps
                'lvl': 1,
                'amount': 1
            },
            { //clerk
                'amount': 0,
                'lvl': 1
            },
            { //house
                'lvl': 1
            },
            { //cleandirt
                //'cleaned': false,
                'lvl': 1
            }
        ], 
    },
    'SHOPITEMS': {
        'CHAPTER1' : [
            { //pumps
                'name': 'Second Pump',
                'available': 1,
                'price' : 2000,
            },
            { //clerk
                'name': 'Hire Clerk',
                'available': 1,
                'price' : 3500,
            },
            { //clerkupdate
                'name': 'Train Clerk',
                'available': 9,
                'price' : 400
            },
            { //house
                'name': 'Upgrade the House',
                'available' : 2,
                'price' : 5000,
            },
            { //cleandirt
                'name': 'Clean the station',
                'available' : 1,
                'price' : 600,
            }
        ],
        'CHAPTER2': {},
        'CHAPTER3': {}
    },
    'STORY': {
        'INTRO': {
            played: false //false
        },
        'MAYOR': {
            played: false
        },
        'CLERK': {
            played: false
        }
    }
}
//_K.debug.inspect = true;

// LOAD ASSETS
loadSprite('bg-day', 'src/backgrounds/finalDay.PNG'); //TODO CHANGE SPRITE TO OWN
loadSprite('bg-night', 'src/backgrounds/finalNight.PNG'); //TODO CHANGE SPRITE TO OWN
loadSprite('bird', 'src/assets/bird.png', { //OWN SPRITE
    sliceX: 4,
    anims:{fly:{from:0, to:3, loop:true}}
})
loadSprite('letter', 'src/assets/letter.png', { //OWN SPRITE
    sliceX: 4,
    anims:{open:{from:0, to:3, loop:false}}
})
loadSpriteAtlas('src/house/house-bitmap.png', { //OWN SPRITE
    "house-c1-u1-day": {
        x:0,
        y:0,
        width:256,
        height: 128
    },
    "house-c1-u1-night": {
        x: 256,
        y: 0,
        width: 256,
        height: 128
    },
    "house-c1-u2-day": {
        x:0,
        y:128,
        width:256,
        height: 128
    },
    "house-c1-u2-night": {
        x: 256,
        y: 128,
        width: 256,
        height: 128
    },
    "house-c1-u3-day": {
        x:0,
        y:256,
        width:256,
        height: 128
    },
    "house-c1-u3-night": {
        x: 256,
        y: 256,
        width: 256,
        height: 128
    },

})
loadSpriteAtlas('src/street/street-bitmap.png', { //OWN SPRITE
    "street-c1-u1-day": {
        x:0,
        y:0,
        width:700,
        height:85,
    },
    "street-c1-u1-night": {
        x:0,
        y:85,
        width:700,
        height:85
    },
    "street-c1-u2-day": {
        x:0,
        y:170,
        width:700,
        height:85
    },
    "street-c1-u2-night": {
        x:0,
        y:255,
        width:700,
        height:85
    },
});
loadSprite('mini-bg', 'src/gui/minigame-bg.png'); //OWN SPRITE
loadSpriteAtlas("src/assets/gas-pump-bitmap.png", { //OWN SPRITE
    "gp-c1-u1-day": {
        x:0,
        y:0,
        width: 64,
        height: 64
    },
    "gp-c1-u1-night": {
        x:64,
        y:0,
        width: 64,
        height: 64
    },
    "gp-c1-u2-day": {
        x:0,
        y:64,
        width: 64,
        height: 64
    },
    "gp-c1-u2-night": {
        x:64,
        y:64,
        width: 64,
        height: 64
    },
    "gp-c1-u3-day": {
        x:0,
        y:128,
        width: 64,
        height: 64
    },
    "gp-c1-u3-night": {
        x:64,
        y:128,
        width: 64,
        height: 64
    }
});
loadSpriteAtlas('src/street/dumpster-bitmap.png', { //OWN SPRITE
    "dumpster-day": {
        x:0,
        y:0,
        width: 256,
        height: 64,
        sliceX: 4,
        anims: {idle:{from:0,to:3, loop: true}}
    },
    "dumpster-night": {
        x:0,
        y:64,
        width: 256,
        height: 64,
        sliceX: 4,
        anims: {idle:{from:0,to:3, loop: true}}
    }
})
loadSprite('clerk', 'src/people/clerk.png'); //OWN SPRITE
loadSpriteAtlas('src/cars/sports-car-bitmap.png', { //OWN SPRITE
    "sportscar-day": {
        x: 0,
        y: 0,
        width: 222,
        height: 38,
        sliceX: 2,
        anims: {idle:{from:0,to:1, loop: true}}
    },
    "sportscar-night": {
        x: 0,
        y: 38,
        width: 222,
        height: 38,
        sliceX: 2,
        anims: {idle:{from:0,to:1, loop: true}}
    }
});
loadSpriteAtlas('src/cars/special-car-bitmap.png', { //OWN SPRITE
    "specialcar-day": {
        x: 0,
        y: 0,
        width: 222,
        height: 38,
        sliceX: 2,
        anims: {idle:{from:0,to:1, loop: true}}
    },
    "specialcar-night": {
        x: 0,
        y: 38,
        width: 222,
        height: 38,
        sliceX: 2,
        anims: {idle:{from:0,to:1, loop: true}}
    }
});
loadSpriteAtlas('src/cars/camper-bitmap.png', { //OWN SPRITE
    "camper-day": {
        x: 0,
        y: 0,
        width: 222,
        height: 45,
        sliceX: 2,
        anims: {idle:{from:0, to: 1, loop:true}}
    },
    "camper-night": {
        x: 0,
        y: 45,
        width: 222,
        height: 45,
        sliceX: 2,
        anims: {idle:{from:0, to: 1, loop:true}}
    }
})
loadSpriteAtlas('src/cars/jeep-bitmap.png', { //OWN SPRITE
    "jeep-day": {
        x:0,
        y:0,
        width: 222,
        height: 45,
        sliceX: 2,
        anims: {idle:{from:0, to:1, loop:true}}
    },
    "jeep-night": {
        x:0,
        y:45,
        width: 222,
        height: 45,
        sliceX: 2,
        anims: {idle:{from:0, to:1, loop:true}}
    }
});
loadSpriteAtlas('src/gui/emotes.png', { //OWN SPRITE
    "game-won": {
        x: 0,
        y: 0,
        width: 16,
        height: 16,
    },
    "game-lost": {
        x: 16,
        y: 0,
        width: 16,
        height: 16,
    }
})
loadSprite('home-bg', 'src/backgrounds/ezgif.com-gif-maker.png', { //OWN SPRITE
    sliceX: 5,
    sliceY: 4,
    anims: { idle: { from: 0, to: 15, loop: true}, },
});
loadSprite('shopkeeper', 'src/people/shopkeeper.png'); //OWN SPRITE
loadSprite('jacob', 'src/people/jacob.png'); //OWN SPRITE
loadSprite('mom', 'src/people/mom.png'); //OWN SPRITE
loadSprite('speech', 'src/gui/comic-2.png');
loadSpriteAtlas('src/people/mayorsprites.png', { //OWN SPRITE
    'mayor-day': {
        x: 0,
        y: 0,
        width: 32,
        height: 64
    },
    'mayor-night': {
        x: 32,
        y: 0,
        width: 32,
        height: 64
    }
})
loadSprite('mayor', 'src/people/mayor.png'); //OWN SPRITES
//UI Sprite Atlas
loadSpriteAtlas("src/gui/GUI.png", { //TODO CHANGE SPRITE TO OWN?!
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
    },
    "shop-button": {
        x: 112,
        y: 80,
        width: 32,
        height: 16
    },
    "level-bar": {
        x: 126,
        y: 16,
        width: 64,
        height: 16
    },
    "level-bar-progress": {
        x: 45,
        y: 0,
        width: 5,
        height: 16
    },
    "forward": {
        x:128,
        y:240,
        width: 16,
        height: 16
    },
    "backward": {
        x:63,
        y:240,
        width: 16,
        height: 16
    }
})

//ALL SCENES
_K.scene('game-desert', _GAME_DESERT);
_K.scene('pause', _PAUSE);
_K.scene('home', _HOME);
_K.scene('shop', _SHOP);
_K.scene('story', _STORY);
_K.scene('tutorial', _TUTORIAL);
_K.scene('debt', _DEBT);
_K.scene('game-end', _GAMEEND);
_K.scene('game-over', _GAMEOVER);

_K.go('home',PLAYER_DATA);
//_K.go('game-desert',PLAYER_DATA);
//_K.go('game-over',PLAYER_DATA);
