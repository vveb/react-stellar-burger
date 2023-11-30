import React from 'react';
import { useSelector } from 'react-redux';
import styles from './feed-images.module.css';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { arrayOfStringsPropType } from '../../utils/prop-types';
import { allIngredientsSelector } from '../../services/store/selectors';

const FeedImages = ({ ingredients }) => {

  const allIngredients = useSelector(allIngredientsSelector);

  const ingredientsToShow = useMemo(() => {
    return ingredients?.slice(0, 6).map((item) => ({ id: item, key: nanoid(8) }));
  }, [ingredients]);

  if(!ingredients || !allIngredients) {
    return null;
  };

  const isCount = ingredients?.length > 6;
  const count = ingredients?.length - 6;

  return (
    <ul className={styles.imagesBox}>
      {ingredientsToShow.map((item, index) => {
        const zIndexValue = index === 5 ? 1 : 7 - index;
        return (
          <li className={styles.imageBack} style={{ zIndex: zIndexValue }} key={item.key}>
            <img className={styles.image} src={allIngredients[item.id]?.image_mobile} alt={allIngredients[item.id].name} />
          </li>
        );
      })}
      {isCount && 
        <li className={styles.countOverlay}>
          <p className={styles.count}>{`+${count}`}</p>
        </li>
      }
    </ul>
  );
};

FeedImages.propTypes = {
  ingredients: arrayOfStringsPropType.isRequired,
}

export default React.memo(FeedImages);