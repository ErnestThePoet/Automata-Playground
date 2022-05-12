import Link from "next/link";
import { connect } from "react-redux";
import { changeCurrentPage } from "store/router-actions";

import classnames from "classnames";

import styles from "styles/link-container.module.scss";

const mapStateToProps = (state, ownProps) => ({
    isActive: state.routerCurrentPageIndex === ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(changeCurrentPage(ownProps.index));
    }
});

const LinkPresenter = props => (
    <Link href={props.href}>
        <a className={classnames(styles.aNavItem, props.isActive ? styles.aNavItemActive : styles.aNavItemInactive)}
            onClick={props.onClick}>
            {props.text}
        </a>
    </Link>
);

const LinkContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPresenter);


// external props required: href, text, index
export default LinkContainer;