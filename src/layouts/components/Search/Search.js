import { useEffect, useState, useRef } from "react";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import * as searchServices from "../../../services/searchServices";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../components/Popper/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountItem from "../../../components/AccountItem";
import { SearchIcon } from "../../../components/Icons/index";
import { useDebounce } from "../../../hooks";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);
function Search() {
	const [searchValue, setSearchValue] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const debouncedValue = useDebounce(searchValue, 500);
	const inputSearchRef = useRef();
	const handleClear = () => {
		setSearchValue("");
		setSearchResult([]);
		inputSearchRef.current.focus();
	};
	const handleHideResult = () => {
		setShowResult(false);
	};
	const handleChange = (e) => {
		const searchValue = e.target.value;
		if (!searchValue.startsWith(" ")) {
			setSearchValue(searchValue);
		}
	};
	useEffect(() => {
		if (!debouncedValue.trim()) {
			setSearchResult([]);
			return;
		}
		const fetchApi = async () => {
			setLoading(true);
			const result = await searchServices.search(debouncedValue);
			setSearchResult(result);
			setLoading(false);
		};
		fetchApi();
	}, [debouncedValue]);
	return (
		<HeadlessTippy
			interactive
			visible={showResult && searchResult.length > 0}
			render={(attrs) => (
				<div className={cx("search-result")} tabIndex="-1" {...attrs}>
					<PopperWrapper>
						<h4 className={cx("search-title")}>Account</h4>
						{searchResult.map((result) => (
							<AccountItem key={result.id} data={result} />
						))}
					</PopperWrapper>
				</div>
			)}
			onClickOutside={handleHideResult}
		>
			<div className={cx("search")}>
				<input
					ref={inputSearchRef}
					value={searchValue}
					placeholder="Search accounts and videos"
					spellCheck={false}
					onChange={handleChange}
					onFocus={() => setShowResult(true)}
				/>
				{!!searchValue && !loading && (
					<button className={cx("clear-btn")} onClick={handleClear}>
						<FontAwesomeIcon icon={faCircleXmark} />
					</button>
				)}
				{loading && (
					<FontAwesomeIcon
						className={cx("loading")}
						icon={faSpinner}
					/>
				)}
				<button
					className={cx("search-btn")}
					onMouseDown={(e) => e.preventDefault()}
				>
					<SearchIcon />
				</button>
			</div>
		</HeadlessTippy>
	);
}

export default Search;
