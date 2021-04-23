import { useMediaQuery } from 'react-responsive';
import { mobileMediaQuery } from '../../helpers/mediaQueries';
import MobileControls from './MobileControls/MobileControls';
import DesktopControls from './DesktopControls/DesktopControls';

interface Props {
    className?: string
}

const Controls = (props: Props) => {
    const isMobile = useMediaQuery(mobileMediaQuery);
    return isMobile ? (
        <MobileControls />
    ) : (
        <DesktopControls className={props.className} />
    );
};

export default Controls;