import { animated, useSpring } from '@react-spring/web';
import React, { ReactNode } from 'react';
import { ModalBoxContainer } from './styles';

interface ModalBoxProps {
  children: ReactNode;
  type?: 'create' | 'delete';
}

export function ModalBox({ children, type = 'create' }: ModalBoxProps) {
  const animation = useSpring({
    from: { top: '40%' },
    to: { top: '50%' },
  });

  return (
    <ModalBoxContainer as={animated.div} style={animation} modalType={type}>
      {children}
    </ModalBoxContainer>
  );
}
