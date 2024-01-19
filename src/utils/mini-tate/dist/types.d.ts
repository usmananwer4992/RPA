import { CSSProperties } from 'react';
export type TAnnotation = {
    height: string;
    width: string;
    top: string;
    left: string;
    name: string;
    type: string | null;
};
export declare const corner: {
    readonly TOP_LEFT: "TL";
    readonly BOTTOM_LEFT: "BL";
    readonly TOP_RIGHT: "TR";
    readonly BOTTOM_RIGHT: "BR";
};
export type TAnnotationRaw = {
    name: string;
    type: string | null;
    x: number;
    y: number;
    w: number;
    h: number;
  tagId: string;
};
export type TImgRatio = {
    height: number;
    width: number;
};
export type TLabels = {
    nameLabel?: string;
    typeLabel?: string;
    saveLabel?: string;
    cancelLabel?: string;
    deleteLabel?: string;
};
export type TOptions = {
    annoStyles?: Partial<CSSProperties>;
    editStyles?: Partial<CSSProperties>;
    labels?: TLabels;
    imgStyles?: Partial<CSSProperties>;
};
export declare const errorTypes: {
    readonly BLANK: "BLANK_NAME";
    readonly DUPLICATE: "DUPLICATE_NAME";
};
