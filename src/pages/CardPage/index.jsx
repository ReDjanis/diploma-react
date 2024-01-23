import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styled from "./index.module.scss";
import { Link } from 'react-router-dom';
import CardFull from './CardFull';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { editBasket, editCount, editSum } from '../../store/reducers/products';

function CardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.products.basket);
    const countStore = useSelector((state) => state.products.count);
    const sumStore = useSelector((state) => state.products.sum);
    const [addProducts, setAddProducts] = useState(JSON.parse(localStorage.getItem('products')) ?? []);

    // запись в store, чтобы там были данные при обновлении страницы:
    useEffect(() => {
        dispatch(editBasket(addProducts));
    }, [])

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(basket));
        setAddProducts(basket);
        // подсчет суммы
        let total = basket.reduce((accum, item) => {
            return accum += (item.price * item.count)
        }, 0)
        // подсчет количества
        let totalCount = basket.reduce((accum, item) => {
            return accum += item.count;
        }, 0)
        // обновление данных в store:
        dispatch(editSum(total));
        dispatch(editCount(totalCount));
    }, [basket])

    // функция изменения окончаний
    function sklonenie(number, txt) {
        var cases = [2, 0, 1, 1, 1, 2];
        return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    return (
        <div className={styled.background__cardPage}>
            <div className={styled.container}>
                <Header
                    childrenOne=
                    {
                        <button onClick={() => navigate(-1)} className={styled.header__return}>
                            <img src="../diploma-react/images/icon_btnReturn.svg" alt="вернуться на предыдущую страницу"></img>
                        </button>
                    }
                    childrenTwo=
                    {
                        <Link to='/basket' className={styled.header__basket}>
                            <span>
                                {countStore + ' ' + sklonenie(countStore, ['товар', 'товара', 'товаров'])} <br />
                                на сумму {sumStore} ₽
                            </span>
                            <img src="../diploma-react/images/icon_basket.png" alt="корзина"></img>
                        </Link>
                    }
                />

                <CardFull />

            </div>
        </div>
    );
}

export default CardPage;