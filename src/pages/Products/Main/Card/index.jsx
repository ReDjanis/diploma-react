import { useSelector } from "react-redux";
import styled from "./index.module.scss"
import { useEffect, useState } from "react";

function Card({ item, handleBtnAdd, handleBtnDelete }) {
    const basket = useSelector((state) => state.products.basket);
    const [condition, setCondition] = useState(false);

    useEffect(() => {
        let basketID = basket.map(elem => elem = elem.id);
        basketID.includes(item.id) ? setCondition(true) : setCondition(false)
    }, [basket])

    return (
        <div className={styled.card}>

            <img src={item.src} alt={item.title} className={styled.card__img}></img>
            <div className={styled.card__info}>

                <div className={styled.card__title}>
                    {item.title}
                </div>

                <div className={styled.card__description}>
                    {item.description}
                </div>

            </div>

            <div className={styled.card__footer}>
                <div>
                    <span>{item.price} ₽</span>
                    <span>/ {item.weight} г.</span>
                </div>
                {condition ? (
                    <button
                        className={styled.card__btn_del}
                        onClick={(event) => { event.preventDefault(); handleBtnDelete() }}
                    >
                    </button>
                ) : null}
                {/* в кнопке сначала отменяем переход в карточку товара с помощью preventDefault() и вешаем нужное событие */}
                <button
                    className={styled.card__btn}
                    onClick={(event) => { event.preventDefault(); handleBtnAdd() }}
                >
                </button>

            </div>

        </div>

    )
}

export default Card;