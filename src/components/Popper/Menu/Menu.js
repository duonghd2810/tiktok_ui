import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "..";
import MenuItem from "./MenuItem";
import Header from "./Header";

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({
	items = [],
	children,
	hideOnClick = false,
	onChange = defaultFn,
}) {
	const [history, setHistory] = useState([{ data: items }]);
	const curent = history[history.length - 1];
	const renderItem = () => {
		return curent.data.map((item, i) => {
			const isParent = !!item.children;
			return (
				<MenuItem
					key={i}
					data={item}
					onClick={() => {
						if (isParent) {
							setHistory((prev) => [...prev, item.children]);
						} else {
							onChange(item);
						}
					}}
				/>
			);
		});
	};

	return (
		<Tippy
			delay={[0, 100]}
			offset={[12, 8]}
			hideOnClick={hideOnClick}
			interactive
			placement="bottom-end"
			render={(attrs) => (
				<div className={cx("menu-list")} tabIndex="-1" {...attrs}>
					<PopperWrapper className={cx("menu-popper")}>
						{history.length > 1 && (
							<Header
								title={curent.title}
								onBack={() => {
									setHistory((prev) =>
										prev.slice(0, prev.length - 1)
									);
								}}
							/>
						)}
						<div className={cx("menu-body")}>{renderItem()}</div>
					</PopperWrapper>
				</div>
			)}
			onHide={() => setHistory((prev) => prev.slice(0, 1))}
		>
			{children}
		</Tippy>
	);
}
Menu.propTypes = {
	items: PropTypes.array,
	children: PropTypes.node.isRequired,
	hideOnClick: PropTypes.bool,
	onChange: PropTypes.func,
};
export default Menu;
