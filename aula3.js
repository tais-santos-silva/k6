import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

// Definição das métricas
const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const myRate = new Rate('taxa_req_200');
const myTrend = new Trend('taxa_de_espera');

export default function () {
    const req = http.get('http://test.k6.io/');

    // Contador
    chamadas.add(1);

    // Medidor
    myGauge.add(req.timings.blocked);

    // Taxa
    myRate.add(req.status === 200);

    // Tendência
    myTrend.add(req.timings.waiting);
}
