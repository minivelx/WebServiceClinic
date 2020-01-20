import { style, animate, keyframes, animation } from '@angular/animations'

export const fadeIn = animation([
    animate('{{time}}', keyframes([
        style({
            opacity: 0,
            offset: 0
        }),
        style({
            opacity: 1,
            offset: 1
        })
    ]))
]);