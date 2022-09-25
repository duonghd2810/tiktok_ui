import classNames from "classnames/bind";
import styles from "./AccountPreview.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountPreview() {
	return (
		<div className={cx("wrapper")}>
			<header className={cx("header")}>
				<img
					className={cx("avatar")}
					src="https://img.meta.com.vn/Data/image/2021/09/21/hinh-anh-cho-con-3.jpg"
					alt=""
				/>
				<Button className={cx("follow-btn")} primary>
					Follow
				</Button>
			</header>
			<div className={cx("body")}>
				<p className={cx("nickname")}>
					<strong>duonghoangdang</strong>
					<FontAwesomeIcon
						className={cx("check-icon")}
						icon={faCheckCircle}
					/>
				</p>
				<p className={cx("name")}>Dương Hoàng Đăng</p>
				<p className={cx("analytics")}>
					<strong className={cx("value")}>8.2M </strong>
					<span className={cx("label")}>Followers</span>
					<strong className={cx("value")}>10.2M </strong>
					<span className={cx("label")}>Followers</span>
				</p>
			</div>
		</div>
	);
}

export default AccountPreview;
