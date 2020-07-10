import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
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
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
