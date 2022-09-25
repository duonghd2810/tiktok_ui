// import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { Wrapper as PopperWrapper } from "../Popper";
import styles from "./SuggestedAccounts.module.scss";
import AccountPreview from "./AccountPreview";

const cx = classNames.bind(styles);

function AccountItem() {
	const renderPreview = (props) => {
		return (
			<div tabIndex="-1" {...props}>
				<PopperWrapper>
					<AccountPreview />
				</PopperWrapper>
			</div>
		);
	};
	return (
		<>
			<Tippy
				interactive
				delay={[800, 0]}
				render={renderPreview}
				placement="bottom"
				offset={[-20, 10]}
			>
				<div className={cx("account-item")}>
					<img
						className={cx("avatar")}
						src="https://img.meta.com.vn/Data/image/2021/09/21/hinh-anh-cho-con-3.jpg"
						alt=""
					/>
					<div className={cx("item-info")}>
						<p className={cx("nickname")}>
							<strong>duonghoangdang</strong>
							<FontAwesomeIcon
								className={cx("check-icon")}
								icon={faCheckCircle}
							/>
						</p>
						<p className={cx("name")}>Dương Hoàng Đăng</p>
					</div>
				</div>
			</Tippy>
		</>
	);
}
AccountItem.propTypes = {};
export default AccountItem;
