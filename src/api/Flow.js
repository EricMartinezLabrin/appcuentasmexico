// import {
//   FLOW_URL,
//   APIKEY_SAND_FLOW,
//   SECRET_SAND_FLOW,
//   APP_URL,
// } from "../assets/Const";

// import FlowApi from "flowcl-node-api-client";

// const config = {
//   apiKey: APIKEY_SAND_FLOW,
//   secretKey: SECRET_SAND_FLOW,
//   apiURL: FLOW_URL,
//   baseURL: APP_URL,
// };

// const serviceName = "payment/create";

// export async function FlowPayment(parameters) {
//   try {
//     // Instancia la clase FlowApi
//     const flowApi = new FlowApi(config);
//     // Ejecuta el servicio
//     let response = await flowApi.send(serviceName, parameters, "POST");
//     console.log(response);
//     //Prepara url para redireccionar el browser del pagador
//     redirect = response.url + "?token=" + response.token;
//     return redirect;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
