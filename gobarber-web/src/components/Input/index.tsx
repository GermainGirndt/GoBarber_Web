import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // transforms to boolean
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error}
    </Container>
  );
};

export default Input;
