/* Local Vision — checkout Paddle (spec 127).
   O relay cria a transação (com o install_id) e manda o cliente para
   pay.html?_ptxn=txn_...; o Paddle.js abre o checkout dessa transação.
   O client-side token do Paddle é público e entra no build via
   PADDLE_CLIENT_TOKEN; token "test_..." liga o ambiente sandbox. */
(function () {
  "use strict";
  var TOKEN = "";
  var status = document.getElementById("payStatus");
  function say(msg) { if (status) status.textContent = msg; }
  if (!window.Paddle) { say("The payment script was blocked. Disable content blockers and reload."); return; }
  if (!/_ptxn=/.test(location.search)) { say("This link is missing the checkout ID. Open the checkout again from the Local Vision app."); return; }
  if (TOKEN.indexOf("test_") === 0) window.Paddle.Environment.set("sandbox");
  window.Paddle.Initialize({
    token: TOKEN,
    checkout: { settings: { successUrl: location.origin + "/pay-done.html", displayMode: "overlay" } }
  });
})();
