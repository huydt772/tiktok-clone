import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1652425200&x-signature=ieAqsJrftnAcF0oR6wStlDCNAWg%3D"
                alt="Dao Le Phuong Hoa"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>hoaa.hanassiii</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>hoaa.hanassiii</span>
            </div>
        </div>
    );
}

export default AccountItem;
