import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const { name, cpf, phone, street, number, district, city, zip } = req.body;

  if (!name || !cpf || !phone || !street || !number || !district || !city || !zip) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const apiKey = process.env.C7_API_KEY;
  const secretKey = process.env.C7_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return res.status(500).json({ error: "Chaves de API não configuradas." });
  }

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

    const response = await axios.post(
      "https://api.carteirado7.com/v2/payment/create",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "X-C7-Timestamp": timestamp,
          "X-C7-Signature": signature,
        },
      }
    );

    const pixData = response.data.payment;
    const pixCode = pixData.pixCopiaECola;

    if (!pixCode) {
      throw new Error("PIX não encontrado na resposta.");
    }

    return res.json({
      success: true,
      pixCode,
      qrCode: pixData.qrCodeBase64,
      amount: 34.90,
      orderId: payload.externalId,
    });
  } catch (error: any) {
    const errorMsg = error.response?.data || error.message;
    console.error("Erro PIX:", JSON.stringify(errorMsg));
    return res.status(500).json({
      error: "Erro ao processar pagamento.",
      details: errorMsg,
    });
  }
}
