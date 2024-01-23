import styled from "./index.module.scss"
import CardBasket from "./CardBasket"
import { useDispatch, useSelector } from "react-redux";
import { editBasket } from "../../../store/reducers/products";
import { Link } from "react-router-dom";

function MainBasket() {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.products.basket);

    // функция удаления из store
    const deleteStore = (count, id) => {

        if (count > 1) {
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
        <div className={styled['main-basket']}>

            {basket.map((item) => {
                return (
                    <Link to={`/card/${item.id}`} className={styled.link}>
                        <CardBasket
                            item={item}
                            handleBtnDelete={() => deleteStore(item.count, item.id)}
                        />
                    </Link>
                )
            })}



        </div>
    )
}

export default MainBasket;