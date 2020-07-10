import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';

// UseField is a hook that receives the field name
import { useField } from '@unform/core';

import { Container } from './styles';

// extends the property from normal input (InputHTMLAttributes)
// Don't worry about HTMLInputElement; it's already global in application
// We're receing the icons as a prop -> icon: React.ComponentType
// After that, we're adding directly it's properties (size)
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

// FC stands for Function Component
// Using Unform for registering input data
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // ref selects the object
  // path apply a property to the selected ref
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};

export default Input;
