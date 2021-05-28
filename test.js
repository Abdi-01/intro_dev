let dataUser = {
    username: '',
    password: ''
}

let dataUserNew = {
    username: 'Abdi',
    password: '123',
    role: 'user'
}

let dataUpdate = { ...dataUser, ...dataUserNew }
console.log(dataUser, dataUserNew)
console.log(dataUpdate)

// let arrA = [1, 2, 3]
// let arrB = [1, 5, 6]
// let ArrC = [...arrA, ...arrB]
// console.log(ArrC)