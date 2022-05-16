import { APP_STATES } from "observables/app-state";

export function adjustPropertyEditorPosition(
    pageAppState, pagePropertyEditorData, adjustToCenterBeneath = true) {
    if ((pageAppState.currentState === APP_STATES.EDIT_STATE
        || pageAppState.currentState === APP_STATES.EDIT_TRANSITION)
        && !pagePropertyEditorData.isPropertyEditorPositionAdjusted) {
        const canvasWrapper = document.getElementById("div-canvas-wrapper");
        const propertyEditorWrapper = document.getElementById("property-editor-wrapper");

        if (canvasWrapper && propertyEditorWrapper) {
            // top and left to make property editor center beneath click point.
            // top and left stored in pagePropertyEditorData is click point.
            const verticalAdjustmentPx = adjustToCenterBeneath ? 30 : 0;
            const horizontalAdjustmentPx =
                adjustToCenterBeneath
                    ? - propertyEditorWrapper.clientWidth / 2
                    : 0;

            const boundaryLeft = canvasWrapper.offsetLeft+canvasWrapper.clientLeft;
            const boundaryTop = canvasWrapper.offsetTop+canvasWrapper.clientTop;
            
            const boundaryRight = boundaryLeft + canvasWrapper.clientWidth;
            const boundaryBottom = boundaryTop + canvasWrapper.clientHeight;

            let targetTop = pagePropertyEditorData.propertyEditorTop + verticalAdjustmentPx;
            let targetLeft =
                pagePropertyEditorData.propertyEditorLeft + horizontalAdjustmentPx;
            // calculate right side position
            const propertyEditorRight = targetLeft + propertyEditorWrapper.clientWidth;

            // if right side exceeds screen boundary, then align right screen boundary
            if (propertyEditorRight > boundaryRight) {
                targetLeft -= propertyEditorRight - boundaryRight;
            }

            // if left side exceeds screen boundary, then align left screen boundary
            if (targetLeft < boundaryLeft) {
                targetLeft = boundaryLeft;
            }

            // if bottom exceeds screen bottom, then make property editor above click point
            if (targetTop + propertyEditorWrapper.clientHeight > boundaryBottom) {
                targetTop =
                    adjustToCenterBeneath
                        ? (pagePropertyEditorData.propertyEditorTop
                            - verticalAdjustmentPx
                            - propertyEditorWrapper.clientHeight)
                        : (boundaryBottom - propertyEditorWrapper.clientHeight);
            }

            // if the adjustment made it exceed screen top, then simply align screen top
            if (targetTop < boundaryTop) {
                targetTop = boundaryTop;
            }

            pagePropertyEditorData.setPropertyEditorPosition(targetTop, targetLeft, true);
        }
    }
}