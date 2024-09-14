import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 2,
    duration: '5s'
}

export default function(){
    const res = http.get('http://test.k6.io');

    check(res,{
        'status code é 200': (r) => r.status ===200
    });
}
    
    // 5. Gerar Relatório
// Função para gerar um relatório no formato HTML com base nos dados coletados durante o teste.
export function handleSummary(data) {
    return {
      "teste_k6.html": htmlReport(data),  // Salva o relatório com o nome 'teste_k6.html'
    };
}

