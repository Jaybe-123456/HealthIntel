import type { FastifyInstance } from "fastify";

export async function listInvoices(app: FastifyInstance, customerId: string) {
  const invoices = await app.stripe.invoices.list({ customer: customerId, limit: 5 });
  return invoices.data.map((invoice) => ({
    id: invoice.id,
    amountDue: invoice.amount_due,
    status: invoice.status,
    hostedInvoiceUrl: invoice.hosted_invoice_url
  }));
}

export async function createUsageRecord(
  app: FastifyInstance,
  payload: { subscriptionItemId: string; quantity: number }
) {
  return app.stripe.subscriptionItems.createUsageRecord(payload.subscriptionItemId, {
    quantity: payload.quantity,
    timestamp: Math.floor(Date.now() / 1000),
    action: "increment"
  });
}
