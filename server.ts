import express from "express";
import path from "path";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  const { name, cpf, phone, street, number, district, city, zip } = req.body;

  if (!name || !cpf || !phone || !street || !number || !district || !city || !zip) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const apiKey = process.env.C7_API_KEY;
  const secretKey = process.env.C7_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return res.status(500).json({ error: "Chaves de API não configuradas." });
  }

  const apiUrl = "https://api.carteirado7.com/v2/payment/create";

  const payload = {
    amount: 34.90,
    description: "Fita Clareadora Fotyo",
    externalId: Math.random().toString(36).substring(7).toUpperCase(),
  };

  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body = JSON.stringify(payload);

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(timestamp + "." + body)
      .digest("hex");

    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-C7-Timestamp": timestamp,
        "X-C7-Signature": signature,
      },
    });

    const pixData = response.data.payment;
    const pixCode = pixData.pixCopiaECola;

    if (!pixCode) {
      throw new Error("Resposta da API não contém o código PIX.");
    }

    res.json({
      success: true,
      pixCode,
      qrCode: pixData.qrCodeBase64,
      amount: 34.90,
      orderId: payload.externalId,
    });
  } catch (error: any) {
    const errorMsg = error.response?.data || error.message;
    console.error("Erro ao gerar PIX:", JSON.stringify(errorMsg, null, 2));
    res.status(500).json({
      error: "Erro ao processar pagamento.",
      details: errorMsg,
    });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
