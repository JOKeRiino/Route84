// initialize context
import kaboom from "https://unpkg.com/kaboom@next/dist/kaboom.mjs";

export const k = kaboom({
    global: true,
    fullscreen: false,
    width: 700,
    height: 400,
    scale: 1,
    debug: true,
});

export default k