import {
  trigger,
  animate,
  transition,
  style,
  query,
  stagger,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50%)' }),
    animate('0.2s', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const tableAnimation = trigger('tableAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        stagger(
          '75ms',
          animate(
            '150ms ease-out',
            style({ opacity: 1, transform: 'translateX(0px)' })
          )
        ),
      ],
      { optional: true }
    ),
  ]),
]);
