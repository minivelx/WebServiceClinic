import { style, animate, keyframes, animation } from '@angular/animations'

export const fadeInDown = animation([
    animate('{{time}}', keyframes([
        style({
            display: 'block',
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)',
            offset: 0
        }),
        style({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            offset: 1
        })
    ]))
]);