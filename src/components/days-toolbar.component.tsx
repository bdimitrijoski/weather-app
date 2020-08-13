import { IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React, { FC } from 'react';

export interface DaysToolbarComponentProps {
    pageIndex: number;
    onPageIndexChanged: Function;
}

const DaysToolbarComponent: FC<DaysToolbarComponentProps> = ({ pageIndex, onPageIndexChanged }) => {
    const isPrevBtnDisabled = () => {
        return pageIndex === 0;
    };

    const isNextBtnDisabled = () => {
        return pageIndex >= 2;
    };

    const pageIndexChanged = (type: string) => {
        const newPageIndex = type === 'next' ? pageIndex + 1 : pageIndex - 1;
        onPageIndexChanged(newPageIndex);
    };

    return (
        <div className="days-toolbar">
            <IconButton aria-label="Prev" className="pull-left" onClick={() => pageIndexChanged('prev')} disabled={isPrevBtnDisabled()}>
                <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label="Next" className="pull-right" onClick={() => pageIndexChanged('next')} disabled={isNextBtnDisabled()}>
                <Icon>chevron_right</Icon>
            </IconButton>
        </div>
    );
};

export default DaysToolbarComponent;
