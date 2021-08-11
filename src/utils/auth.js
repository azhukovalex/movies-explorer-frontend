export const BASE_URL = "https://azhukovalexback.vint1024.ru";
//export const BASE_URL = "http://localhost:3001";

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password
        }),
    })
        .then(res => {
            if (res.status === 400) { throw new Error('При регистрации пользователя произошла ошибка.') }
            else if (res.status === 409) { throw new Error('Пользователь с таким email уже существует.') }
            else return res.json()
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
};

export const authorize = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({             
            email: data.email,
            password: data.password }),
    })
        .then((res) => {
            if (res.status === 200) {
                console.log("authorize OK");
                return res.json();
            }
            if (res.status === 400) {
                throw new Error("Не передано одно из полей");
            }
            if (res.status === 401) {
                throw new Error("Пользователь с email не найден");
            }
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data;
            }
            return;
        })
        .catch((err) => {
            console.log(err.satus);
            return Promise.reject(err);
        });
};

export const getContent = (token) => { //tokenCheck
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if (res.status === 400) {
                throw new Error("Токен не передан или передан не в том формате");
            }
            if (res.status === 401) {
                throw new Error("Переданный токен некорректен");
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
};

