import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
export interface ICursorState {
    coords: number[];
}
export declare const cursorSlice: import("@reduxjs/toolkit").Slice<ICursorState, {
    setCoords: (state: import("immer/dist/internal").WritableDraft<ICursorState>, action: PayloadAction<number[]>) => void;
}, "cursor">;
export declare const setCoords: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<number[], "cursor/setCoords">;
export declare const selectCursor: (state: RootState) => ICursorState;
declare const _default: import("redux").Reducer<ICursorState, import("redux").AnyAction>;
export default _default;
