import {animate, state, style, transition, trigger} from '@angular/animations';

export const routerAnimations = {
    fade: trigger('routerTransition', [
        state('*', style({position: 'fixed', width: '100%', height: '100%', opacity: 1})),
        transition(':enter', [
            style({opacity: 0}),
            animate('0.3s ease-in')
        ]),
        transition(':leave', [
            animate('0.3s ease-out', style({opacity: 0}))
        ])
    ]),

    slideToRight: trigger('routerTransition', [
        state('*', style({position: 'fixed', width: '100%'})),
        transition(':enter', [
            style({transform: 'translateX(-100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
        ])
    ]),

    slideToLeft: trigger('routerTransition', [
        state('*', style({position: 'fixed', width: '100%'})),
        transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
        ])
    ]),

    slideToBottom: trigger('routerTransition', [
        state('*', style({position: 'fixed', width: '100%', height: '100%'})),
        transition(':enter', [
            style({transform: 'translateY(-100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
        ])
    ]),

    slideToTop: trigger('routerTransition', [
        state('*', style({position: 'fixed', width: '100%', height: '100%'})),
        transition(':enter', [
            style({transform: 'translateY(100%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0%)'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
        ])
    ]),
};