import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.99'], 
    },
};

export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles';
    const res = http.get(BASE_URL);

    // Adicionar logs para verificar a resposta
    console.log(`Status Code: ${res.status}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Aguarde um pouco para não sobrecarregar o servidor
    sleep(1);
}
