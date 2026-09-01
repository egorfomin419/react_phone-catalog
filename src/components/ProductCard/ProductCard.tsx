import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { itemId, name, price, fullPrice, screen, capacity, ram, image } =
    product;

  const hasDiscount = fullPrice > price;

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(itemId);
  const favorite = isFavorite(itemId);

  return (
    <div className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.name}>
        {name}
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>${price}</span>

        {hasDiscount && <span className={styles.fullPrice}>${fullPrice}</span>}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span>{screen}</span>
        </div>

        <div className={styles.specRow}>
          <span>Capacity</span>
          <span>{capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span>RAM</span>
          <span>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.addToCart} ${
            inCart ? styles.addToCartActive : ''
          }`}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favoriteButton} ${
            favorite ? styles.favoriteButtonActive : ''
          }`}
          aria-label="Add to favorites"
          onClick={() => toggleFavorite(product)}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
};
