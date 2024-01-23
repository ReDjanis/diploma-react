import React from 'react';
import styled from './index.module.scss'
import FormLogin from './FormLogin';
import { useEffect, useState } from "react";
import FormRegistration from './FormRegistration';
import { useNavigate } from "react-router-dom";
import Modal from '../../components/Modal';

function LoginPage() {
    const navigate = useNavigate();
    const [typeForm, setTypeForm] = useState(true);
    const [textErrLog, setTextErrLog] = useState('');
    const [textErrPassword, setTextErrPassword] = useState('');
    const [textErr, setTextErr] = useState('');
    const [loginValue, setloginValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const [checked, setChecked] = useState(false);
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) ?? []);
    const [registered, setRegistered] = useState(JSON.parse(localStorage.getItem('registered')) ?? false);
    const [activeModal, setActiveModal] = useState(false);

    // запись в local storage входа пользователя:
    useEffect(() => {
        localStorage.setItem('registered', JSON.stringify(registered));
    }, [registered])

    // переменная для проверки введенных значений в инпуты:
    let checkInput;

    // запись в local storage новых зарегистрированных пользователей:
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

    // Функция проверки наличия пользователя в local Storage
    const checkRegistered = (value1, value2) => {
        return users.some(element => element.login == value1 && element.password == value2)
    }

    // функция проверки введенных значений: 
    const checkValue = () => {
        if (loginValue === '') {
            setTextErrLog('Поле не должно быть пустым')
            checkInput = false;
        } else if (loginValue.length < 4) {
            setTextErrLog('Логин должен содержать не менее 4-х символов')
            checkInput = false;
        } else {
            setTextErrLog('')
            checkInput = true;
        }

        if (passValue === '') {
            setTextErrPassword('Поле не должно быть пустым')
            checkInput = checkInput && false;
        } else if (passValue.length < 4) {
            setTextErrPassword('Пароль должен содержать не менее 4-х символов')
            checkInput = checkInput && false;
        } else {
            setTextErrPassword('')
            checkInput = checkInput && true;
        }
    }

    // кнопка "Войти"
    const handleClickBtn = (event) => {
        event.preventDefault();
        setTextErr('')
        checkValue();
        console.log(users)

        if (checkInput) {
            if (checkRegistered(loginValue, passValue)) {
                let newArr = JSON.parse(JSON.stringify(users));
                newArr.filter(item => item.login === loginValue).map(item => {
                    item.subscription = checked;
                })
                setUsers(newArr);
                setRegistered(true);
                navigate('/*');
            } else {
                setTextErr('Логин или пароль неверен')
                setTextErrLog('')
                setTextErrPassword('')
                setloginValue('')
                setPassValue('')
            }
        }
    }

    // кнопка "Зарегистрироваться"
    const handleClickReg = (event) => {
        event.preventDefault();
        checkValue();
        if (checkInput) {
            if (users.filter(item => item.login === loginValue).length) {
                let newArr = JSON.parse(JSON.stringify(users));
                newArr.filter(item => item.login === loginValue).map(item => {
                    item.password = passValue;
                    item.subscription = checked;
                })
                setUsers(newArr);
            } else {
                let newArr = JSON.parse(JSON.stringify(users));
                newArr.push({
                    login: loginValue,
                    password: passValue,
                    subscription: checked,
                })
                setUsers(newArr);
            }
            setRegistered(true);
            setActiveModal(true);
            setTimeout(() => navigate('/*'), 2000);
        }
    }

    return (
        <div className={styled.background}>
            <FormLogin
                warn={typeForm}
                setTypeForm={setTypeForm}
                loginValue={loginValue}
                setloginValue={setloginValue}
                passValue={passValue}
                setPassValue={setPassValue}
                handleClickBtn={handleClickBtn}
                textErrLog={textErrLog}
                textErrPassword={textErrPassword}
                textErr={textErr}
                checked={checked}
                setChecked={setChecked}
            />
            <FormRegistration
                warn={typeForm}
                setTypeForm={setTypeForm}
                loginValue={loginValue}
                setloginValue={setloginValue}
                passValue={passValue}
                setPassValue={setPassValue}
                handleClickReg={handleClickReg}
                textErrLog={textErrLog}
                textErrPassword={textErrPassword}
                checked={checked}
                setChecked={setChecked}
            />
            <Modal
                active={activeModal}
                setActive={setActiveModal}
                children=
                {
                    <p>Поздравляем! Вы зарегистрировались.</p>
                }

            />
        </div>
    );
}

export default LoginPage;