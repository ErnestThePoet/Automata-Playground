import react from "react";

import styles from "styles/dfa/dfa-toolbar.module.scss";

import classnames from "classnames";

export default class DfaToolbar extends react.Component{
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className={classnames(this.props.className,styles.divToolbarWrapper)}>
            <div className="d-flex justify-content-center">
                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center")}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-circle-plus")}></i>
                    <span className={styles.spanButtonText}>添加状态</span>
                </span>

                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center")}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-arrow-right-long")}></i>
                    <span className={styles.spanButtonText}>添加转移</span>
                </span>

                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center")}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-trash-can")}></i>
                    <span className={styles.spanButtonText}>删除选中</span>
                </span>

                <span className={classnames(
                    styles.spanButtonWrapper,
                    "d-flex flex-column align-items-center")}>
                    <i className={classnames(styles.iButtonIcon, "fa-solid fa-play")}></i>
                    <span className={styles.spanButtonText}>运行</span>
                </span>
            </div>
        </div>
    )
}