const express = require("express");
require("dotenv").config();
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const app = express();

app.get("/", async (req, res) => {
  try {
    // Azure Key Vault configuration
    const vaultUrl = `https://test-cert-kv.vault.azure.net/`;

    // Create an instance of DefaultAzureCredential
    const credential = new DefaultAzureCredential();

    // Create an instance of SecretClient
    const client = new CertificateClient(vaultUrl, credential);

    const certificateName = "sig-keys";

    // Retrieve the latest version of the certificate
    const certificate = await client.getCertificate(certificateName);

    // Access the certificate's properties and values
    console.log("Certificate:", certificate);

    res.status(200).send("success");
  } catch (err) {
    console.log("error", err);
    res.status(500).send("failed");
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Example app is listening on port 3000.")
);
