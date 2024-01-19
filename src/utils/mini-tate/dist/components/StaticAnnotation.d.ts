/// <reference types="react" />
import { TOptions } from '../types';
export type Props = {
    top: string;
    left: string;
    height: string;
    width: string;
    onClick: () => void;
    options: TOptions;
    name: string;
    rainbowMode: boolean;
    type?: string | null;
  types?: string[];
    tagId:string;
};
declare function StaticAnnotation({ height, width, top, left, onClick, options, name, rainbowMode, type, types,tagId }: Props): JSX.Element;
export default StaticAnnotation;
