export declare const testAnno: {
    name: string;
    type: string;
    top: string;
    left: string;
    width: string;
    height: string;
};
export declare const renderEditableAnno: () => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export declare const render: (ui: any, { preloadedState, store, ...renderOptions }?: {
    preloadedState?: {};
    store?: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
        mode: import("./store/reducers/modes").IModeState;
        currAnno: import("./store/reducers/currAnno").ICurrAnnoState;
        cursor: import("./store/reducers/cursor").ICursorState;
    }, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
        mode: import("./store/reducers/modes").IModeState;
        currAnno: import("./store/reducers/currAnno").ICurrAnnoState;
        cursor: import("./store/reducers/cursor").ICursorState;
    }, import("redux").AnyAction, undefined>]>;
}) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export * from '@testing-library/react';
