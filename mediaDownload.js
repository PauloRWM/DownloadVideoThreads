const { parentPort, workerData } = require('worker_threads');
const axios =require("axios")
const fs = require("fs")
const path = require("path")
// Simula uma tarefa pesada
async function downloadVideo(workerData) {
  // Função para baixar o arquivo

  const response = await axios({
    method: 'GET',
    url: workerData.link,
    responseType: 'stream'
  });

  // Criar um stream de gravação
  const writer = fs.createWriteStream(`${workerData.path}${workerData.name}`);

  // Pipe o conteúdo da resposta para o stream de gravação
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Executa a função e envia o resultado de volta para o processo principal
downloadVideo(workerData).then(result => {
  parentPort.postMessage(result);
}).catch(err => {
  parentPort.postMessage({ error: err.message });
});
