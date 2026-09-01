/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchField.module.scss';

type Props = {
  placeholder: string;
};

export const SearchField = ({ placeholder }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setValue(searchParams.get('query') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('query')]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams);

      if (value) {
        next.set('query', value);
      } else {
        next.delete('query');
      }

      next.delete('page');

      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next);
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => setValue('')}
        >
          ✕
        </button>
      )}
    </div>
  );
};
