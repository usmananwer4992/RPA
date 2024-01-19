import { TAnnotation, TAnnotationRaw } from './types';
export declare const pixelToNum: (pixelStr: any) => number;
export declare const rawToCSSAnno: (rawAnnos: TAnnotationRaw[], imgHeight: number, imgWidth: number, tagId:string) => TAnnotation[];
export declare const cssToRawAnno: (cssAnnos: TAnnotation[], imgHeight: number, imgWidth: number) => TAnnotationRaw[];
