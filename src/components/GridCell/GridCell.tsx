import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children?: ReactNode;
    column: number;
    row: number;
};

const GridCell = ({
    children,
    column,
    row
}: Props) => {
    const StyledGridCell = styled.div`
        grid-column: ${column};
        grid-row: ${row};
    `;

    return (
        <StyledGridCell>
            {children}
        </StyledGridCell>
    );
};

export default GridCell;
