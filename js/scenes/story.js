import _K from '../kaboom.js'
import _TUTORIAL from './tutorial.js';

export default function _STORY (PLAYER_DATA) {
    layers(['bg', 'obj', 'ui'], 'obj')
    
    add([rect(700,400),color(40,40,80),layer('bg')]);

    let JACOB = add([
        sprite('jacob'),
        pos(0,274),
        layer('bg'),
        scale(.5)
    ])
    JACOB.hidden = true;

    let MOM = add([
        sprite('mom', {
            flipX: true
        }),
        pos(574,274),
        layer('bg'),
        scale(.5)
    ])
    MOM.hidden = true;

    let MAYOR = add([
        sprite('mayor'),
        pos(574,274),
        layer('bg'),
        scale(.5)
    ])
    MAYOR.hidden = true;

    //LAUNCH STORY DEPENDING ON WHERE YOU ARE IN THE GAME
    if(!PLAYER_DATA.STORY.INTRO.played){
        //INTRO STORY
        //JACOB.hidden = false;
        MOM.hidden = false;

        let momspeech = add([
            sprite("speech"),
            pos(260,170),
            layer('obj'),
            scale(.7,.3),
            color(255,221,232),
            "speech"
        ]) //MOM SPEECH BUBBLE
        let jacobspeech = add([
            sprite("speech", {
                flipX: true
            }),
            pos(140,270),
            layer('obj'),
            scale(.7,.3),
            color(196,222,255),
            "speech"
        ]) //JACOB SPEECH BUBBLE
        jacobspeech.hidden = true;
        add([
            text("Jacob, honey?"),
            pos(280,180),
            layer('ui'),
            scale(.25),
            "speech1"
        ]) //MOM SPEECH TEXT

        wait(1, () => {
            add([
                text("Grandpa sent you a letter!"),
                pos(280,200),
                layer('ui'),
                scale(.25),
                "speech1"
            ])
        })

        wait(2, () => {
            add([
                sprite('forward'),
                pos(320,90),
                layer('ui'),
                scale(3.5),
                area(),
                'speech1',
                'fw'
            ])
    
            clicks('fw', () => {
                every('speech1', (s1) => {
                    destroy(s1);
                })
                momspeech.hidden = true;
                MOM.hidden = true;

                let letter = add([
                    sprite("letter"),
                    scale(1.2),
                    pos(270,90),
                    layer('obj'),
                    area(),
                    'letter',
                    cursor('pointer'),
                ])

                clicks("letter",(l) => {
                    l.play('open');
        
                     wait(1, () => {
                         destroy(letter);
        
                         add([
                            rect(400,400),
                            pos(150,100),
                            layer('ui'),
                            'letter-txt',
                            color(255,241,174)
                        ])
                        add([
                            text("Dear Jacob,\nI know my time has come. When\nyou're reading this, I am no\nlonger here. I need you to do\nsomething for me:"),
                            layer('ui'),
                            pos(160,115),
                            scale(.25),
                            color(80,80,160),
                            'letter-txt'
                        ])
                        add([
                            text("I hope you remember the old gas\nstation on Route 84. I need you to\ntake over! There is nobody else I\ntrust enough to do it.\n\nLove you forever,\nGrandpa"),
                            layer('ui'),
                            pos(160,220),
                            scale(.25),
                            color(80,80,160),
                            'letter-txt'
                        ])
                     })
        
                     wait(5, () => {
                         add([
                             sprite('forward'),
                             pos(320,20),
                             layer('ui'),
                             scale(3.5),
                             area(),
                             'forward',
                             'letter-txt'
                         ])
        
                         clicks('forward', () => {
                            every('letter-txt', (lt) => {
                                destroy(lt);
                            })

                            MOM.hidden = false;
                            momspeech.hidden = false;

                            add([
                                text("What does it say, honey?"),
                                pos(280,180),
                                layer('ui'),
                                scale(.25),
                                "speech2"
                            ])

                            wait(2, () => {
                                JACOB.hidden = false;
                                jacobspeech.hidden = false;

                                add([
                                    text("..."),
                                    pos(160,280),
                                    scale(.25),
                                    "speech2"
                                ])

                                wait(1, () => {
                                    add([
                                        text("I'm gonna be away for a\nfew days, ok?"),
                                        pos(160,300),
                                        scale(.25),
                                        "speech2"
                                    ])
                                    
                                    add([
                                        sprite('forward'),
                                        pos(320,20),
                                        layer('ui'),
                                        scale(3.5),
                                        area(),
                                        'fwd',
                                        'speech2'
                                    ])
                   
                                    clicks('fwd', () => {
                                       every('speech2', (lt) => {
                                           destroy(lt);
                                       })

                                       add([
                                        text("..."),
                                        pos(280,180),
                                        layer('ui'),
                                        scale(.25),
                                        "speech3"
                                        ])

                                        wait(1, () => {
                                            add([
                                                text("Ok honey, just make sure\nyou're safe out there, ok?!"),
                                                pos(280,200),
                                                layer('ui'),
                                                scale(.25),
                                                "speech3"
                                            ])

                                            wait(1, () => {
                                                add([
                                                    text("...Mom, I'll be fine!\nLove you!"),
                                                    pos(160,280),
                                                    scale(.25),
                                                    "speech3"
                                                ])

                                                wait(1.5, () => {
                                                    add([
                                                        sprite("shop-button"),
                                                        pos(240,20),
                                                        layer('ui'),
                                                        scale(8,3.5),
                                                        area(),
                                                        'fwad',
                                                        'speech3'
                                                    ])

                                                    add([
                                                        text("Go on a trip"),
                                                        pos(285,36),
                                                        layer('ui'),
                                                        scale(.3),
                                                        area(),
                                                        'speech3'
                                                    ])

                                                    clicks('fwad', () => {
                                                        every("speech3", (s3) => {
                                                            destroy(s3);
                                                        })
                                                        momspeech.hidden = true;
                                                        jacobspeech.hidden = true;
                                                        MOM.hidden = true;
                                                        JACOB.hidden = true;

                                                        PLAYER_DATA.STORY.INTRO.played = true;
                                                        go('tutorial', PLAYER_DATA);
                                                    })
                                                })
                                            })
                                        })
                                       
                                    })
                                })
                            })

                         })
                     })
                })
            })
        })
    }
    else if(!PLAYER_DATA.STORY.MAYOR.played){
        MAYOR.hidden = false;

        let mayorspeech = add([
            sprite("speech"),
            pos(260,170),
            layer('obj'),
            scale(.7,.3),
            color(255,221,232),
            "speech"
        ]) //MAYOR SPEECH BUBBLE
        let jacobspeech = add([
            sprite("speech", {
                flipX: true
            }),
            pos(140,270),
            layer('obj'),
            scale(.7,.3),
            color(196,222,255),
            "speech"
        ]) //JACOB SPEECH BUBBLE
        jacobspeech.hidden = true;
        add([
            text("Excuse me, young boy?!"),
            pos(280,180),
            layer('ui'),
            scale(.25),
            "speech1"
        ]) //MOM SPEECH TEXT

        wait(1, () => {
            jacobspeech.hidden = false;
            JACOB.hidden = false;
            add([
                text("... What's wrong,\nold man?"),
                pos(160,280),
                scale(.25),
                "speech1"
            ])
            add([
                sprite('forward'),
                pos(320,90),
                layer('ui'),
                scale(3.5),
                area(),
                'speech1',
                'fw'
            ])
    
            clicks('fw', () => {
                every('speech1', (s1) => {
                    destroy(s1);
                })

                add([
                    text("... OLD MAN?!?\nI am the MAYOR of this\ntown! Who are YOU?"),
                    pos(280,180),
                    layer('ui'),
                    scale(.25),
                    "speech2"
                ])
                wait(1, () => {
                    add([
                        text("Cool, cool. I am Herberts\ngrandson. I'm running the\ngas station now!"),
                        pos(160,280),
                        scale(.25),
                        "speech2"
                    ])
                })

                wait(2.2, () => {
                    add([
                        sprite('forward'),
                        pos(320,90),
                        layer('ui'),
                        scale(3.5),
                        area(),
                        'speech2',
                        'fwd'
                    ])

                    clicks('fwd', () => {
                        every('speech2', (s1) => {
                            destroy(s1);
                        })

                        add([
                            text("Whatever, whatever..\nAnyway you owe me MONEY"),
                            pos(280,180),
                            layer('ui'),
                            scale(.25),
                            "speech3"
                        ])

                        wait(1, () => {
                            add([
                                text("Wait, Why do I owe YOU\nmoney?! And ... how much\nare we talking here?"),
                                pos(160,280),
                                scale(.25),
                                "speech3"
                            ])
                        })

                        wait(2.2, () => {
                            add([
                                sprite('forward'),
                                pos(320,90),
                                layer('ui'),
                                scale(3.5),
                                area(),
                                'speech3',
                                'fowd'
                            ])
        
                            clicks('fowd', () => {
                                every('speech3', (s1) => {
                                    destroy(s1);
                                })

                                add([
                                    text("Well, your Grandpa took out\na loan and never repaid it."),
                                    pos(280,180),
                                    layer('ui'),
                                    scale(.25),
                                    "speech4"
                                ])
        
                                wait(1, () => {
                                    add([
                                        text("Oh my, he probably wan-\nted to renovate the place.\nBut how much is it?"),
                                        pos(160,280),
                                        scale(.25),
                                        "speech4"
                                    ])
                                })

                                wait(2.2, () => {
                                    add([
                                        sprite('forward'),
                                        pos(320,90),
                                        layer('ui'),
                                        scale(3.5),
                                        area(),
                                        'speech4',
                                        'forwd'
                                    ])
                
                                    clicks('forwd', () => {
                                        every('speech4', (s1) => {
                                            destroy(s1);
                                        })

                                        add([
                                            text("Not that much...\n$23,000!"),
                                            pos(280,180),
                                            layer('ui'),
                                            scale(.25),
                                            "speech5"
                                        ])
                
                                        wait(1, () => {
                                            add([
                                                text("23,000?!?\nHow am I supposed to pay\nthat?!"),
                                                pos(160,280),
                                                scale(.25),
                                                "speech5"
                                            ])
                                        })

                                        wait(2.2, () => {
                                            add([
                                                sprite('forward'),
                                                pos(320,90),
                                                layer('ui'),
                                                scale(3.5),
                                                area(),
                                                'speech5',
                                                'forwad'
                                            ])
                        
                                            clicks('forwad', () => {
                                                every('speech5', (s1) => {
                                                    destroy(s1);
                                                })

                                                add([
                                                    text("I don't care! Pay it until\nthe 31st. Or I'm going\nto tear down the place."),
                                                    pos(280,180),
                                                    layer('ui'),
                                                    scale(.25),
                                                    "speech6"
                                                ])
                        
                                                wait(1, () => {
                                                    add([
                                                        text("..."),
                                                        pos(160,280),
                                                        scale(.25),
                                                        "speech6"
                                                    ])
                                                })

                                                wait(2.2, () => {
                                                    add([
                                                        sprite('forward'),
                                                        pos(320,90),
                                                        layer('ui'),
                                                        scale(3.5),
                                                        area(),
                                                        'speech6',
                                                        'forward'
                                                    ])
                                
                                                    clicks('forward', () => {
                                                        every('speech6', (s1) => {
                                                            destroy(s1);
                                                        })
        
                                                        add([
                                                            text("Anyway, I have more im-\nportant things to do.\nJust pay."),
                                                            pos(280,180),
                                                            layer('ui'),
                                                            scale(.25),
                                                            "speech7"
                                                        ])
                                
                                                        wait(5, () => {
                                                            MAYOR.hidden = true;
                                                            mayorspeech.hidden = true;

                                                            every("speech7", (s) => {
                                                                destroy(s);
                                                            })

                                                            add([
                                                                text("... What would Grandpa do?"),
                                                                pos(160,280),
                                                                scale(.25),
                                                                "speech8"
                                                            ])

                                                            wait(2, () => {
                                                                add([
                                                                    sprite('forward'),
                                                                    pos(320,90),
                                                                    layer('ui'),
                                                                    scale(3.5),
                                                                    area(),
                                                                    'speech8',
                                                                    'forward2'
                                                                ])
                                            
                                                                clicks('forward2', () => {
                                                                    every("speech8", (s) => {
                                                                        destroy(s);
                                                                    });
    
                                                                    PLAYER_DATA.STORY.MAYOR.played = true;
                                                                    _K.go("game-desert", PLAYER_DATA);
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    else if(!PLAYER_DATA.STORY.CLERK.played){
        //CLERK INTRODUCTION STORY
    }
    // clicks( () => {
    //     _K.go('game-desert',PLAYER_DATA);
    // })

}