import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Process Checkout & Generate PIX
  app.post("/api/checkout", async (req, res) => {
    const { name, cpf, phone, street, number, district, city, zip } = req.body;
    
    if (!name || !cpf || !phone || !street || !number || !district || !city || !zip) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const apiKey = process.env.C7_API_KEY || "c7_live_fbb9bef0f0f1f6e34a6d36534880a3c6eae4f82c4c21d46dbfc4a8ca172cf6cc";
    const secretKey = process.env.C7_SECRET_KEY || "5e018b0d6e692b9401313998ee1eaebb1a37264a45e7503fa12dbb7ecac1a1defac3d36fc86d3549d265b84909b9aad82cc69d1b2b2e55b52dfdcbb351b5a13e";
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
          "X-C7-Signature": signature
        }
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
        orderId: payload.externalId
      });
    } catch (error: any) {
      const errorMsg = error.response?.data || error.message;
      console.error("Erro ao gerar PIX:", JSON.stringify(errorMsg, null, 2));
      
      res.status(500).json({ 
        error: "Erro ao processar pagamento.",
        details: errorMsg
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
