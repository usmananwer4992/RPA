import { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store/store';
import { TImgRatio } from './types';
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    mode: import("./store/reducers/modes").IModeState;
    currAnno: import("./store/reducers/currAnno").ICurrAnnoState;
    cursor: import("./store/reducers/cursor").ICursorState;
}, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("redux").AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export declare const useCurrentImg: () => TImgRatio;
