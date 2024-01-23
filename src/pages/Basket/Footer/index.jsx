import styled from "./index.module.scss";
import ButtonStyled from "../../../components/Button";

function Footer({ sum, handleBtn }) {
    return (
        <div className={styled.footer}>
            <div className={styled["footer-container"]}>
                <div className={styled.footer__info}>
                    <span>Заказ на сумму:</span>
                    <span>{sum} ₽</span>
                </div>

                <ButtonStyled
                    name="Оформить заказ"
                    bgColor='#d58c51'
                    color='#131313'
                    onClick={handleBtn}
                />
            </div>
        </div>
    );
}

export default Footer;
