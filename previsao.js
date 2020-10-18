const { Console } = require('console');
const fetch = require('node-fetch');

async function weatherApi(){


    const APIResponse = await fetch(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/hours/72?city?name=Niterói&token=${token}`)
    const APIResponseJson = await APIResponse.json()
    console.log(APIResponseJson)

}

async function putLocals(){
    let url = `http://apiadvisor.climatempo.com.br/api-manager/user-token/${token}/locales`
    let locals = []
    var myInit = {method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: {

                    }};
    const Response = await fetch(url, meth)

}
