export type PaymentMethod = {
  id: string;
  name: string;
  src: string;
};

/** Logos oficiales — extraídos de captura de marca (scripts/extract-original-logos.py) */
export const paymentMethods: PaymentMethod[] = [
  { id: "visa", name: "Visa", src: "/payments/visa.png" },
  { id: "mastercard", name: "Mastercard", src: "/payments/mastercard.png" },
  { id: "redcompra", name: "Redcompra", src: "/payments/redcompra.png" },
  { id: "bancoestado", name: "BancoEstado", src: "/payments/bancoestado.png" },
  { id: "google-pay", name: "Google Pay", src: "/payments/google-pay.png" },
  { id: "apple-pay", name: "Apple Pay", src: "/payments/apple-pay.png" },
  { id: "contactless", name: "Pago sin contacto", src: "/payments/contactless.png" },
  { id: "amex", name: "American Express", src: "/payments/amex.png" },
];
