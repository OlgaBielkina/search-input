import { rest } from 'msw';
/**
 * a list of handlers (endpoints) to emulate (mock) a actual implementation
 */
export const handlers = [
    // rest.get('http://localhost:3000/search', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             name: 'Rick Sanchez',
    //             description: 'Scientist extraordinaire',
    //         }),
    //     );
    // }),
];
