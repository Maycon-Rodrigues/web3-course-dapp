import React from 'react';

interface ButtonProps {
  buttonName: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ buttonName, onClick }) => {
  return (
    <button
      type="button"
      className="w-32 p-2 bg-fuchsia-500 rounded-md hover:bg-fuchsia-600"
      onClick={onClick}
    >
      {buttonName || 'Button Name'}
    </button>
  );
};
