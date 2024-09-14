import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    scenarios: {
        my_scenario: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '30s',  
        },
    }
};

export default function () {
    // Fazendo a requisição HTTP e definindo a variável 'res'
    let res = http.get('https://test.k6.io/contacts.php');

    // Verificando se o status da resposta é 200
    check(res, {
        "status is 200": (r) => r.status === 200,
    });

    // Pausa de 0,5 segundos entre as requisições
    sleep(0.5);
}


