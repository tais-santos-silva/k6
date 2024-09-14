/*
Função Principal do Teste:

Criação de Página: Abre uma nova página no navegador (const page = browser.newPage()).
Navegação: Acessa a URL https://test.k6.io/my_messages.php.
Interação com a Página:
Preenche os campos de login com admin e 123.
Localiza e clicar no botão de submit.
Aguarda a navegação após o clique.
Validação: Verifica se o texto "Welcome, admin!" aparece na página após o login.
Pausa: Faz uma pausa de 1 segundo (sleep(1)).
Fechamento da Página: Fecha a página após a execução (page.close()). */


// Importa módulos necessários do k6 para automação de browser e medições.
import { browser } from 'k6/experimental/browser';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Configurações do teste.
export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus', // Define um cenário de execução constante de usuários virtuais.
      vus: 3, // Define o número de usuários virtuais.
      duration: '10s', // Define a duração do teste.
      options: {
        browser: {
          type: 'chromium', // Especifica o tipo de navegador usado no teste.
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'], // Define que todos os checks devem ser 100% bem-sucedidos. 
    browser_web_vital_fid: ["p(75) <= 100"], // Define um limite para o First Input Delay.
    browser_web_vital_lcp: ["p(75) <= 2500"], // Define um limite para o Largest Contentful Paint.
  },
  summaryTrendStats: ["min","med","avg","max","p(75)","p(95)","p(99)"], // Define as estatísticas a serem incluídas no sumário.
};

// Função principal do teste, onde as ações de navegação e validações são realizadas.
export default async function () {
  const page = browser.newPage(); // Cria uma nova página no navegador.

  try {
    await page.goto('https://test.k6.io/my_messages.php'); // Navega para a URL especificada.

    // Insere o nome de usuário e a senha nos campos de login.
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]'); // Localiza o botão de submit.

    // Aguarda o clique no botão de submit e a navegação da página.
    await Promise.all([submitButton.click(), page.waitForNavigation()]);

    // Verifica se o texto "Welcome, admin!" aparece na página após o login.
    check(page, {
        header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
    });

    sleep(1) // Pausa a execução por 1 segundo.
  } finally {
    page.close(); // Fecha a página após a execução.
  }
}

// Geração de relatório.
export function handleSummary(data) {
  console.log('Gerando relatório...');
  return {
    stdout: JSON.stringify(data, null, 2), // Exibe o sumário de execução no console em formato JSON.
    "relatorio_k6.html": htmlReport(data), // Gera um relatório HTML.
  };
}