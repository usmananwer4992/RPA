/// <reference types="react" />
import { TAnnotationRaw, TOptions } from '../types';
import './styles.css';
export type TProps = {
    imageSrc: string;
    annos?: TAnnotationRaw[];
    onChange?: (annos: TAnnotationRaw[]) => any;
    onError?: (error: string) => any;
    annotationTypes?: string[];
    options?: TOptions;
    rainbowMode?: boolean;
};
export declare function ImageAnnotator({ imageSrc, annos, onChange, onError, annotationTypes, options, rainbowMode, }: TProps): JSX.Element;
export declare namespace ImageAnnotator {
    var defaultProps: {
        annos: any;
        annotationTypes: any[];
        onChange: any;
        onError: any;
        options: any[];
    };
}
