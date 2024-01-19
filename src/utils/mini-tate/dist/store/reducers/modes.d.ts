import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
export interface IModeState {
    edit: boolean;
    drag: boolean;
    cornerDrag: boolean;
}
export declare const modeSlice: import("@reduxjs/toolkit").Slice<IModeState, {
    setEdit: (state: import("immer/dist/internal").WritableDraft<IModeState>, action: PayloadAction<boolean>) => void;
    setDrag: (state: import("immer/dist/internal").WritableDraft<IModeState>, action: PayloadAction<boolean>) => void;
    setCornerDrag: (state: import("immer/dist/internal").WritableDraft<IModeState>, action: PayloadAction<boolean>) => void;
}, "mode">;
export declare const setEdit: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, "mode/setEdit">, setDrag: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, "mode/setDrag">, setCornerDrag: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, "mode/setCornerDrag">;
export declare const selectMode: (state: RootState) => IModeState;
declare const _default: import("redux").Reducer<IModeState, import("redux").AnyAction>;
export default _default;
