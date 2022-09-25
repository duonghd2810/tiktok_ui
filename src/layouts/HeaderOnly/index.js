import classNames from "classnames/bind";
import Header from "../components/Header";
import styles from "./HeaderOnly.module.scss";

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
	return (
		<div className={cx("wrapper")}>
			<Header />
			<div className="container">
				<div className="content">{children}</div>
			</div>
		</div>
	);
}

export default HeaderOnly;
