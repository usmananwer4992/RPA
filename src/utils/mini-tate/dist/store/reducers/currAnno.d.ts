import { PayloadAction } from '@reduxjs/toolkit';
import { TAnnotation } from '../../types';
import type { RootState } from '../store';
export interface ICurrAnnoState {
    selectedAnno: TAnnotation | null;
    selectedCorner: string;
    updatedCoords: {
        width?: string;
        height?: string;
        top?: string;
        left?: string;
    };
}
export declare const currAnnoSlice: import("@reduxjs/toolkit").Slice<ICurrAnnoState, {
    setSelectedAnno: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<TAnnotation | null>) => void;
    clearSelectedAnno: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>) => void;
    setSelectedCorner: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setWidth: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setHeight: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setTop: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setLeft: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
}, "currAnno">;
export declare const setSelectedAnno: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<TAnnotation, "currAnno/setSelectedAnno">, setSelectedCorner: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "currAnno/setSelectedCorner">, setWidth: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "currAnno/setWidth">, setHeight: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "currAnno/setHeight">, setTop: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "currAnno/setTop">, setLeft: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "currAnno/setLeft">, clearSelectedAnno: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"currAnno/clearSelectedAnno">;
export declare const selectCurrAnno: (state: RootState) => ICurrAnnoState;
declare const _default: import("redux").Reducer<ICurrAnnoState, import("redux").AnyAction>;
export default _default;
