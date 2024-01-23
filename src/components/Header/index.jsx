import styled from "./index.module.scss";
import ButtonStyled from "../Button";
import { useNavigate } from 'react-router-dom';

function Header({ title, childrenOne = null, childrenTwo = null }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
        localStorage.removeItem('products');
        localStorage.setItem('registered', JSON.stringify(false));
    }

    return (
        <header className={styled.header}>
            <div className={styled.header__firstElement}>
                {childrenOne ?? null}
                <div className={styled.header__title}>{title}</div>
            </div>
            <div className={styled.header__lastElement}>
                {childrenTwo ?? null}
                <ButtonStyled
                    name="Выйти"
                    onClick={handleClick}
                />
            </div>
        </header>
    );
}

export default Header;
