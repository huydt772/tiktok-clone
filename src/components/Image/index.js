import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(
    (
        { src, alt, className, fallback: customFallback = images.noImage, ...props },
        ref,
    ) => {
        const [fallback, setFallbak] = useState('');

        const handleError = () => {
            setFallbak(customFallback);
        };

        return (
            <img
                className={cx('wrapper', className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    },
);

export default Image;
