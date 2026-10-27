// Ersatz für das Onepage-eigene Paket "onepage-kit".
// Außerhalb von Onepage gibt es kein eingebautes CRM. Das Kontaktformular sendet deshalb
// per POST (JSON) an den Endpoint aus VITE_FORM_ENDPOINT (z. B. ein GoHighLevel-Webhook).
// Ist keiner gesetzt, schlägt das Absenden bewusst fehl – es wird kein Erfolg vorgetäuscht.

type SubmitArgs = { formId: string; data: Record<string, string> };

const ENDPOINT: string = (import.meta as any).env?.VITE_FORM_ENDPOINT ?? '';

export const crm = {
  async submitForm({ formId, data }: SubmitArgs): Promise<void> {
    if (!ENDPOINT) {
      throw new Error('Kein Formular-Endpoint konfiguriert (VITE_FORM_ENDPOINT).');
    }
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formId, ...data }),
    });
    if (!res.ok) throw new Error(`Formular-Endpoint antwortete mit ${res.status}`);
  },
};
