/// <reference types="react" />
import { TAnnotation, TLabels } from '../types';
type Props = {
    name: string;
    type: string | null;
    top: string;
    left: string;
    height: string;
    width: string;
    handleSave: (annotation: TAnnotation, originalName: string) => void;
    handleCancel: () => void;
    handleDelete: ((name: string) => void) | null;
    annotationTypes: string[];
    labels: TLabels;
};
declare function Form({ name, type, top, left, height, width, handleSave, handleCancel, handleDelete, annotationTypes, labels, }: Props): JSX.Element;
export default Form;
