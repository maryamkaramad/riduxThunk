export const Login = (username, password) => {
    return new Promise((resolve, reject) => {
        //pending
        if (username === 'maryam' && password === '1111') {
            //fulfilled
            setTimeout(() => {
                resolve({
                    name: 'maryam',
                    age: 28,
                    country: 'iran'
                })
            }, 6000)
        } else {
            //rejected
            reject('invalid password or username')
        }
    })
}