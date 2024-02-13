import styles from './styles.module.css';
import FavIcon from './fav.svg';
import LogoutIcon from './logout.svg';
import HomeIcon from './home.svg';
import { type } from 'os';

type Props = {
    color: string;
    label: string;
    icon: 'fav' | 'logout' | 'home';
    onClick: () => void;
}

export const SidebarMenuItem = ({color, label, icon, onClick}: Props) => {
    return (
        <div className={styles.container} onClick={onClick}>
            {icon === 'fav' && <FavIcon color = {color} />}
            {icon === 'logout' && <LogoutIcon color = {color} />}
            {icon === 'home' && <HomeIcon color = {color} />}
            <span>{label}</span>
        </div>
    );
}