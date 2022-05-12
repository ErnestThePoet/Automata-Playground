import react from "react";

import styles from "styles/dfa/dfa-toolbar.module.scss";

import classnames from "classnames";

export default class DfaToolbar extends react.Component{
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className={classnames(this.props.className,styles.divToolbarWrapper)}>
            <div>
                <i className="fa-solid fa-circle-plus"></i>
                <i className="fa-solid fa-arrow-right-long"></i>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </div>
    )
}