import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { LeadData } from './leadTool';
import type { ChatMessage } from './openrouter';

function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON não configurada no ambiente do servidor.');
  }

  // Aceita tanto o JSON puro quanto uma versão em base64 (útil para colar em env vars sem
  // quebrar por causa de quebras de linha/aspas no JSON da Service Account).
  const looksLikeJson = raw.trim().startsWith('{');
  const jsonString = looksLikeJson ? raw : Buffer.from(raw, 'base64').toString('utf-8');

  return JSON.parse(jsonString);
}

let firestoreInstance: FirebaseFirestore.Firestore | null = null;

function getDb(): FirebaseFirestore.Firestore {
  if (firestoreInstance) return firestoreInstance;

  if (getApps().length === 0) {
    initializeApp({ credential: cert(loadServiceAccount()) });
  }

  firestoreInstance = getFirestore();
  return firestoreInstance;
}

export async function saveLead(
  lead: LeadData,
  meta: { ip?: string; conversation: ChatMessage[] },
): Promise<string> {
  const db = getDb();
  const docRef = await db.collection('leads').add({
    ...lead,
    conversation: meta.conversation,
    ip: meta.ip ?? null,
    createdAt: new Date().toISOString(),
    emailSent: false,
  });
  return docRef.id;
}

export async function markLeadEmailSent(leadId: string, subject: string, body: string): Promise<void> {
  const db = getDb();
  await db.collection('leads').doc(leadId).update({
    emailSent: true,
    emailSentAt: new Date().toISOString(),
    emailSubject: subject,
    emailBody: body,
  });
}
