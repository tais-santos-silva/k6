// 1. Inicialização
// Importa a função sleep do k6 para pausar a execução por um tempo determinado.
// Importa a função htmlReport para gerar um relatório em HTML no final do teste.
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 2. Configuração
// Define as opções do teste, como a quantidade de usuários virtuais (vus) e a duração do teste.
export const options = {
    vus: 1,  // Executa o teste com 1 usuário virtual
    duration: '10s',  // O teste vai durar 10 segundos
};

// 3. Execução
// Função principal que o k6 executa durante o teste. Aqui você define as ações que serão realizadas.
export default function () {
    console.log('testando o k6');  // Exibe uma mensagem no console
    sleep(1);  // Pausa a execução por 1 segundo
}

// 4. Desmontagem
// Função de desmontagem que é executada após o teste, útil para operações de limpeza ou processamento final.
export function teardown(data) {
    console.log(data);  // Exibe os dados finais no console
}

// 5. Gerar Relatório
// Função para gerar um relatório no formato HTML com base nos dados coletados durante o teste.
export function handleSummary(data) {
    return {
      "teste_k6.html": htmlReport(data),  // Salva o relatório com o nome 'teste_k6.html'
    };
}
