import React from 'react';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from '../../services/types';

type BunProps = {
  ingredient: Ingredient;
  type: 'top' | 'bottom';
  extraClass?: string;
}

const Bun = ({ ingredient, type, extraClass = '' }: BunProps) => {
  return (
    <ConstructorElement
      type={type}
      isLocked={true}
      text={ingredient.name + (type === 'top' ? ' (верх)' : ' (низ)')}
      price={ingredient.price}
      thumbnail={ingredient.image}
      extraClass={extraClass}
    />
  );
};

export default React.memo(Bun);