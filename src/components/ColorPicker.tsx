import classNames from 'classnames';
import { useState } from 'react';

export const DEFAULT_PICKER_COLOR = 'bg-yellow-200';

interface ColorPickerProps {
    initialColor? : string;
    onSelectColor: (color: string) => void;
}

export const ColorPicker = ({ onSelectColor, initialColor }: ColorPickerProps) => {
    const [selected, setSelected] = useState(initialColor || DEFAULT_PICKER_COLOR);
  const Colors = [
    'bg-yellow-200',
    'bg-red-200',
    'bg-blue-200',
    'bg-gray-200',
    'bg-green-200',
    'bg-indigo-200',
    'bg-purple-200',
  ];

  const onSelect = (color: string) => {
    setSelected(color);
    onSelectColor(color);
  };

  return (
    <div className="w-full flex justify-between">
      {Colors.map((color) => (
        <div
          key={color}
          onClick={() => onSelect(color)}
          className={classNames(
            'h-6 w-6 rounded-md cursor-pointer transition-all',
            color,
            selected === color && 'ring-2 ring-indigo-500 ring-offset-2',
          )}
        ></div>
      ))}
    </div>
  );
};
