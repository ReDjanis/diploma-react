import React from 'react';
import styled from './index.module.scss'
import ButtonStyled from '../../../components/Button';

function FormRegistration(props) {

    if (props.warn) {
        return null
    }

    const handleClick = () => {
        props.setTypeForm(!props.warn);
        props.setloginValue('');
        props.setPassValue('')
        props.setChecked(false);
    }

    return (
        <div className={styled.form}>
            <div className={styled.form__header}>

                <button className={styled.form__header_btn} onClick={handleClick}>
                    Авторизоваться
                </button>
            </div>
            <div className={styled.form__title}>
                Регистрация
            </div>
            <div className={styled.form__main}>
                <div className={styled.form__input}>
                    <input
                        type="text"
                        placeholder="Логин"
                        onInput={(event) => props.setloginValue(event.target.value)}
                        value={props.loginValue}
                    />
                </div>
                <div className={styled.form__err}>
                    {props.textErrLog}
                </div>
                <div className={styled.form__input}>
                    <input
                        type="password"
                        placeholder="Пароль"
                        onInput={(event) => props.setPassValue(event.target.value)}
                        value={props.passValue}
                    />
                </div>
                <div className={styled.form__err}>
                    {props.textErrPassword}
                </div>
                <div className={styled.form__consent}>
                    <input
                        type="checkbox"
                        id="inputCheckConsent"
                        checked={props.checked}
                        onChange={e => props.setChecked(!props.checked)}
                    />
                    <label for="inputCheckConsent">
                        <div className={styled.form__shell}></div>
                        <div>
                            Я согласен получать обновления на почту
                        </div>
                    </label>
                </div>

            </div>
            <div className={styled.form__btn}>
                <ButtonStyled
                    name='Зарегистрироваться'
                    bgcolor='#d58c51'
                    color='#131313'
                    onClick={props.handleClickReg}
                />
            </div>
        </div>
    );
}

export default FormRegistration;