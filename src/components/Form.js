import React, {useEffect, useRef, useState} from "react";
import './style.css';
import {createPortal} from "react-dom";

export function Form() {
    const surnameRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();

    const [errors, setErrors] = useState({});
    let regSurnameAndName = /[\d\s"':;,./?\\|!@#$%^&*()=_+~<`>[\]{}-]/;
    let regPhone = /(\+38)?0\d{9}/;
    let regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

   /* let surname, name, phone, email;*/
    const [portal, setPortal] = useState(null);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const Submit = (event) => {
        setErrors({})
        event.preventDefault();
        setSurname(surnameRef.current?.value);
        let surnameField = surnameRef.current?.value;
        if (surnameField.length === 0 || surnameField.length > 255)
            setErrors(error => {
                return {...error, surname: " Некоректна довжина прізвища"}
            });
        if (regSurnameAndName.test(surnameField))
            setErrors(error => {
                return {...error, surname: " Некоректні символи в прізвищі"}
            });

        setName(nameRef.current?.value);
        let nameField = nameRef.current?.value;
        if (nameField.length === 0 || nameField.length > 255)
            setErrors(error => {
                return {...error, name: " Некоректна довжина імені"}
            });
        if (regSurnameAndName.test(nameField))
            setErrors(error => {
                return {...error, name: " Некоректні символи в імені"}
            });

        setPhone(phoneRef.current?.value);
        let phoneField = phoneRef.current?.value;
        if (!regPhone.test(phoneField))
            setErrors(error => {
                return {...error, phone: " Некоректні символи в номері телефону"}
            });
        if (phoneField.length === 0 || phoneField.length > 13)
            setErrors(error => {
                return {...error, phone: " Некоректна довжина телефону"}
            });

        setEmail(emailRef.current?.value);
       let emailField = emailRef.current?.value;
        if (!regEmail.test(emailField))
            setErrors(error => {
                return {...error, email: " Некоректні символи в пошті"}
            });
        if (emailField.length === 0 || emailField.length > 255)
            setErrors(error => {
                return {...error, email: " Некоректна довжина пошти"}
            });
    }

     useEffect(()=>{
         if (Object.keys(errors).length === 0 && surname) {
             let modalMessage = <div>{surname} {name}<br/>Телефон: {phone}<br/>
                 Пошта: {email}
                 <hr/>
                 Роботу виконала:<br/> Гладка Катерина<br/>Студентка групи ЗІПЗ-21-1<br/>05.12.2023</div>;
             setPortal(modalMessage);
         } else
             setPortal(null);
     }, [errors]);
    return (
        <>
            <form className="formParent" onSubmit={Submit}>
                <div>Прізвище:
                    {errors?.surname && <span className="errorSpan">{errors.surname}</span>}
                </div>
                <div><input type="text" name="surname" ref={surnameRef}/></div>
                <div>Ім'я:
                    {errors?.name && <span className="errorSpan">{errors.name}</span>}
                </div>
                <div><input type="text" name="name" ref={nameRef}/></div>
                <div>Телефон:
                    {errors?.phone && <span className="errorSpan">{errors.phone}</span>}
                </div>
                <div><input type="text" name="phone" ref={phoneRef}/></div>
                <div>Імейл:
                    {errors?.email && <span className="errorSpan">{errors.email}</span>}
                </div>
                <div><input type="email" name="email" ref={emailRef}/></div>
                <div>
                    <button type="submit">Зареєструватись</button>
                </div>
            </form>
            <div
                className="portal">{portal !== null && (createPortal(portal, document.getElementsByClassName("portal")[0]))
            }</div>
        </>
    );
}