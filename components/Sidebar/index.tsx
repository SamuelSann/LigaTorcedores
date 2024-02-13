import { useAuthContext } from '@/contexts/auth';
import styles from './styles.module.css';
import { Button } from '../Button';
import { Tenant } from '@/types/Liga';
import { SidebarMenuItem } from '../SidebarMenuItem';
import { useRouter } from 'next/router';

type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void;
}

export const Sidebar = ({tenant, open, onClose}: Props) => {
    const { user, setToken, setUser } = useAuthContext();

    const router = useRouter();
    return(
        <div 
        className={styles.container}
        style={{
            width: open ? '100vw' : '0'
        }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div 
                    className={styles.loginArea}
                    style={{borderBottomColor: 'blue'}}
                    >
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Time do Coração
                            </div>
                        }
                        { !user && 
                            <Button 
                                color='blue'
                                label = "Fazer Login"
                                onClick={() => window.location.href = `/${tenant.slug}/login`}
                                fill
                            />
                        }
                    </div>
                    <div 
                    className={styles.closeBtn}
                    style={{color: 'blue'}}
                    onClick={onClose}
                    >X</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                <SidebarMenuItem 
                        color={'#6A7D8B'}
                        icon = "home"
                        label='Home'
                        onClick={() => {onClose(); router.push(`/${tenant.slug}`); }}
                    />

                <SidebarMenuItem 
                        color={'#6A7D8B'}
                        icon = "fav"
                        label='Favorito'
                        onClick={() => {}}
                    />              
                </div>
                <div className={styles.menuButton}>
                {user && 
                        <SidebarMenuItem 
                            color={'#6A7D8B'}
                            icon = "logout"
                            label='Sair'
                            onClick={() => {
                                setToken('');
                                setUser(null);
                                localStorage.removeItem('token'); // Limpe o localStorage se estiver usando.
                                sessionStorage.removeItem('token'); // Limpe o sessionStorage se estiver usando.
                                onClose();
                            }}
                    />
                }
                </div>
            </div>
        </div>
    );
}