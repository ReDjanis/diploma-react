import React from 'react';
import styled from "./index.module.scss"
import Card from "./Card"
import products from "./product";
import { useDispatch, useSelector } from "react-redux";
import { editBasket } from "../../../store/reducers/products";
import { Link } from "react-router-dom";

function Main() {

    const dispatch = useDispatch();
    const basket = useSelector((state) => state.products.basket);

    // функция записи в store
    const recordStore = (id, objProduct) => {
        if (basket.filter(item => item.id === id).length) {
            let newArr = JSON.parse(JSON.stringify(basket));
            newArr.filter(item => item.id === id).map(item => {
                item.count = item.count + 1;
            })
            dispatch(editBasket(newArr));

        } else {
            let newArr = JSON.parse(JSON.stringify(basket));
            newArr.push({
                id: objProduct.id,
                src: objProduct.src,
                title: objProduct.title,
                description: objProduct.description,
                price: objProduct.price,
                weight: objProduct.weight,
                count: 1,
            });
            dispatch(editBasket(newArr));
        }
    }

    // функция удаления из store
    const deleteStore = (id) => {
        if (basket.filter(element => (element.count > 1 && element.id === id)).length) {
            let newArr = JSON.parse(JSON.stringify(basket));
            newArr.filter(item => item.id === id).map(item => {
                item.count = item.count - 1;
            })
            dispatch(editBasket(newArr));
        } else {
            let arrFilter = basket.filter(item => item.id !== id);
            dispatch(editBasket(arrFilter));
        }
    }

    return (
        <div className={styled.main}>

            {products.map((item) => {
                return (
                    <Link to={`/card/${item.id}`} className={styled.link}>
                        <Card
                            item={item}
                            handleBtnAdd={() => recordStore(item.id, item)}
                            handleBtnDelete={() => deleteStore(item.id)}
                        />
                    </Link>
                )
            })}

        </div>

    )

}
export default Main;