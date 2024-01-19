export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    mode: import("./reducers/modes").IModeState;
    currAnno: import("./reducers/currAnno").ICurrAnnoState;
    cursor: import("./reducers/cursor").ICursorState;
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    mode: import("./reducers/modes").IModeState;
    currAnno: import("./reducers/currAnno").ICurrAnnoState;
    cursor: import("./reducers/cursor").ICursorState;
}, import("redux").AnyAction, undefined>]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
