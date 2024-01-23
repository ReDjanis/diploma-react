import React, { useEffect, useState } from 'react';
import styled from "./index.module.scss";
import ButtonStyled from '../../../components/Button';
import products from '../../Products/Main/product';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editBasket } from '../../../store/reducers/products';

function CardFull() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.products.basket);
    const [condition, setCondition] = useState(false);

    useEffect(() => {
        let basketID = basket.map(elem => elem = elem.id);
        basketID.includes(+id) ? setCondition(true) : setCondition(false)
    }, [basket])

    // переменная для хранения объекта с карточкой товара
    let cardObj;

    products.map(item => {
        if (item.id == id) {
            cardObj = Object.assign(item);
        }
    })

    // функция записи в store
    const handleBtnAdd = () => {
        if (basket.filter(item => item.id === +id).length) {
            let newArr = JSON.parse(JSON.stringify(basket));
            newArr.filter(item => item.id === +id).map(item => {
                item.count = item.count + 1;
            })
            dispatch(editBasket(newArr));

        } else {
            let newArr = JSON.parse(JSON.stringify(basket));
            newArr.push({
                id: cardObj.id,
                src: cardObj.src,
                title: cardObj.title,
                description: cardObj.description,
                price: cardObj.price,
                weight: cardObj.weight,
                count: 1,
            });
            dispatch(editBasket(newArr));
        }
    }

    // функция удаления из store
    const handleBtnDel = () => {
        if (basket.filter(element => (element.count > 1 && element.id === +id)).length) {
            let newArr = JSON.parse(JSON.stringify(basket));
            newArr.filter(item => item.id === +id).map(item => {
                item.count = item.count - 1;
            })
            dispatch(editBasket(newArr));
        } else {
            let arrFilter = basket.filter(item => item.id !== +id);
            dispatch(editBasket(arrFilter));
        }
    }

    return (
        <div className={styled.card}>

            <img src={cardObj.src} alt={cardObj.title} className={styled.card__img}></img>

            <div className={styled.card__info}>

                <div className={styled.card__title}>
                    {cardObj.title}
                </div>

                <div className={styled.card__description}>
                    {cardObj.descriptionFull}
                </div>

                <div className={styled.card__footer}>
                    <div className={styled.card__footer_info}> 
                        <span>{cardObj.price} ₽ </span>
                        <span>/ {cardObj.weight} г.</span>
                    </div>

                    <ButtonStyled
                        name="В корзину"
                        bgColor='#d58c51'
                        color='#131313'
                        onClick={handleBtnAdd}
                    />
                </div>
                <div className={styled.card__addButton}>
                    {condition ? (
                        <ButtonStyled
                            name="Удалить из корзины"
                            bgColor='#d58c51'
                            color='#131313'
                            onClick={handleBtnDel}
                        />
                    ) : null}
                </div>

            </div>
        </div>
    );
}

export default CardFull;