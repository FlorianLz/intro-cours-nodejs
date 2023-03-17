import * as http from "http";

/*http.get("http://localhost:8080/", (res: http.IncomingMessage) => {
  let response = "";
  res.on("data", (chunk: any) => {
    //console.log(`chunk: ${chunk}`);
    response += chunk.toString();
  });
  res.on("end", () => {
    console.log(`Réponse: ${response}`);
  });
});*/

http
  .request(
    {
      method: "POST",
      path: "/",
      hostname: "localhost",
      localPort: 8080,
      protocol: "http:",
      headers: {
        "Content-Type": "application/json",
      },
    },
    (res: http.IncomingMessage) => {
      let txtResponse: string = "";
      res.on("data", (chunk: any) => {
        //console.log(`chunk: ${chunk}`);
        txtResponse += chunk.toString();
      });
      res.on("end", () => {
        const obj = JSON.parse(txtResponse);
        console.log(`Réponse: ${txtResponse}`);
      });
    }
  )
  .end();
