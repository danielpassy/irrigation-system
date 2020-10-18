const { Console } = require('console');
const fetch = require('node-fetch');

// documentation for this API: apiadvisor.climatempo.com.br/doc/


async function weatherApi(){
    // forecast, 72 hours, city Niteroi
    // Need to get permission to access Niteroi data, but... the documentation is bad

    const endpoint = `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/hours/72?city?name=Niterói&token=${token}`
    const APIResponse = await fetch(url)
    const APIResponseJson = await APIResponse.json()
    console.log(APIResponseJson)

}

async function configureLocals(){
    // TODO: get permission to access Niterói
    // trasncripting from PHP to JS or call a command prompt to execute the PHP script
    // https://github.com/adinan-cenci/climatempo-api/tree/52ec2e83ad555ada4254cf1f5a05edb4eb8043d6

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
