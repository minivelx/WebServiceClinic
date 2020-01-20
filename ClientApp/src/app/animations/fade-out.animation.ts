import { style, animate, keyframes, animation } from '@angular/animations'

export const fadeOut = animation([
    animate('{{time}}', keyframes([
        style({
            opacity: 1,
            offset: 0
        }),
        style({
            opacity: 0,
            offset: 1
        })
    ]))
]);