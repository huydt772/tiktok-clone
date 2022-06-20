import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import * as searchService from '~/services/searchService';
import AccountItem from '~/components/AccountItem';
import { ClearIcon, LoadingIcon, SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this
        // by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search-wrapper')}>
                    <div className={cx('search')}>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            type="text"
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                        />

                        {!!searchValue && !loading && (
                            <button className={cx('clear')} onClick={handleClear}>
                                <ClearIcon />
                            </button>
                        )}

                        {loading && (
                            <span className={cx('loading')}>
                                <LoadingIcon />
                            </span>
                        )}

                        <button
                            className={cx('search-btn')}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <SearchIcon />
                        </button>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
