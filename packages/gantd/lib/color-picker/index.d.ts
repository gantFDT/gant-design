import React from 'react';
import GantColorPicker from 'color-picker';
export interface GantColorPickerProps {
    onChange?: (color?: string) => void;
    value?: string;
}
declare class ColorPicker extends React.Component<GantColorPickerProps> {
    static PurePicker: typeof GantColorPicker;
    render(): JSX.Element;
}
export default ColorPicker;
