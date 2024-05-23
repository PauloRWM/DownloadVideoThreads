const fs = require("fs-extra");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");

async function processaVideo(link) {
  return new Promise((resolve, reject) => {
    //const workerData = { link: link };
    const worker = new Worker("./mediaDownload.js", {
      workerData: { link: link , path:'./', name:"teste1"},
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Processo encerrado com codigo: ${code}`));
    });
  });
}

// Chamando a função processaVideo e tratando erros
processaVideo(
  "http://172.96.172.8:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3R5cGVib3QvcHVibGljL3dvcmtzcGFjZXMvY2x3NnJ5OXQ0MDA0ODR1NG12cTkzNm44eC90eXBlYm90cy9jbHdma2xsbXUwMDNpdWdjenNrOGpkOW00L2Jsb2Nrcy8xNzE2MjkzMzUwNjMyLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUwyMUZaMUk3WEozUURBTUdCUk84JTJGMjAyNDA1MjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIzVDExNTkxNVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSk1NakZHV2pGSk4xaEtNMUZFUVUxSFFsSlBPQ0lzSW1WNGNDSTZNVGN4TmpVd09EVXdNU3dpY0dGeVpXNTBJam9pWVdSdGFXNXBjM1J5WVdSdmNpSjkuOFAxQzdrYzRxWUFadjQxVUQ3dFlQdXhadWRDbnQ2SUFUeGZrWkRQZXY2U2NSMzdieDBUOEh5QkluZDBLNUdZdExVYU8tU29xRTd3MHJVREtuZ0NmUncmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT0xMWY0MDM1ODcwYTMyZGEzMmExZGU4ODk3NDU4OTQ5YmRmMTZlZjQ5MWY0ZTNhY2JlMzU4YTgxNDMxZDU0NTdj"
)
  .then((result) => {
    console.log("Resultado:", result);
  })
  .catch((err) => {
    console.error("Erro:", err);
  });
