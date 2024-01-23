import { useSelector } from "react-redux";
import styled from "./index.module.scss"

function CardBasket({ item, handleBtnDelete }) {
    const basket = useSelector((state) => state.products.basket);
    return (
        <div className={styled['card-basket']}>
            <div className={styled['card-basket__firstElement']}>
                <img src={item.src} alt={item.title} className={styled['card-basket__img']}></img>

                <div className={styled['card-basket__title']}>
                    {item.title}
                </div>
            </div>

            <div className={styled['card-basket__lastElement']}>
                <span>{item.price} ₽ х {basket.find((elem) => elem.id === item.id)?.count} шт.</span>
                <button
                    className={styled['card-basket__btn']}
                    onClick={(event) => { event.preventDefault(); handleBtnDelete() }}
                >
                </button>
            </div>
        </div>
    )
}

export default CardBasket;