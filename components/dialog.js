import styles from "styles/dialog.module.scss";

import classnames from "classnames";

// props contains title, message and closeDialog
const Dialog = function (props) {
    return (
        <div className={styles.divDialogWall}
            onClick={e => { e.stopPropagation(); }}>
            <div className={classnames(props.className, styles.divDialogWrapper)}
                style={props.style}>
                <div
                    className={classnames(styles.divDialogTitleBar,
                        "d-flex justify-content-between align-items-center")}>
                    <label className={styles.lblDialogTitle}>{props.title}</label>
                    <i
                        className="fa-solid fa-xmark"
                        style={{ cursor: "pointer" }}
                        onClick={() => { props.closeDialog(false); }}></i>
                </div>

                <div className={styles.divDialogBodyWrapper}>
                    <div className={styles.divDialogContentWrapper}>{props.children}</div>

                    {
                        !props.noButton &&
                        <div className={classnames(styles.divYesNoWrapper, "d-flex justify-content-end")}>
                            <button type="button"
                                className={classnames(styles.btnYesNo, "btn btn-light")}
                                onClick={() => { props.closeDialog(false); }}>取消</button>
                            <button type="button"
                                className={classnames(styles.btnYesNo, "btn btn-warning")}
                                onClick={() => { props.closeDialog(true); }}>确定</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Dialog;