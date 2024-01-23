import styled from "./index.module.scss";
import Header from "../../components/Header";
import Footer from "./Footer";
import MainBasket from "./MainBasket";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBasket, editSum } from "../../store/reducers/products";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

function Basket() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sumStore = useSelector((state) => state.products.sum);
    const basket = useSelector((state) => state.products.basket);
    const [correctProduct, setCorrectProduct] = useState(JSON.parse(localStorage.getItem('products')) ?? []);
    const [activeModal, setActiveModal] = useState(false);
    const [condition, setCondition] = useState(false);

    // запись в store, чтобы там были данные при обновлении страницы:
    useEffect(() => {
        dispatch(editBasket(correctProduct));
    }, [])

    // запись в local storage при изменении корзины в store, пересчет суммы в корзине:
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(basket));
        setCorrectProduct(basket);
        // подсчет суммы
        let total = basket.reduce((accum, item) => {
            return accum += (item.price * item.count)
        }, 0)
        dispatch(editSum(total));
    }, [basket])

    // кнопка "Оформить заказ"
    const handleBtnReg = () => {
        setActiveModal(true);

        if (basket.length !== 0) {
            setCondition(true)
            dispatch(editBasket([]));
        }
    }

    return (
        <div>
            <div className={styled['basket-header']}>
                <Header
                    childrenOne=
                    {
                        <button onClick={() => navigate(-1)} className={styled.header__return}>
                            <img
                                src="/images/icon_btnReturn.svg"
                                alt="иконка выхода из корзины"
                            >
                            </img>
                        </button>
                    }
                    title='Корзина с выбранными товарами'
                />
            </div>
            <div className={styled.basket}>
                <MainBasket />
            </div>

            <Footer
                sum={sumStore}
                handleBtn={handleBtnReg}
            />

            <Modal
                active={activeModal}
                setActive={setActiveModal}
                children=
                {(condition) ? (<p>Вы оформили заказ!</p>) : (<p>Ваша корзина пуста!</p>)}
            />
        </div>

    )
}

export default Basket;