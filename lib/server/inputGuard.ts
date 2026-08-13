const INJECTION_PATTERNS: RegExp[] = [
  /ignor[ea]\s+(todas\s+)?(as\s+)?instru[çc][õo]es/i,
  /esque[çc]a\s+(suas|as)\s+instru[çc][õo]es/i,
  /voc[êe]\s+(agora\s+)?[ée]\s+(um[a]?\s+)?(DAN|jailbreak)/i,
  /modo\s+(sem\s+filtro|desenvolvedor|dev|deus|god\s*mode|irrestrito)/i,
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /you\s+are\s+now\s+(DAN|in\s+developer\s+mode)/i,
  /system\s*prompt/i,
  /repita\s+(o\s+|seu\s+)?(system\s*)?prompt/i,
  /mostre?\s+(suas|as)\s+instru[çc][õo]es/i,
  /quais\s+(s[ãa]o\s+)?suas\s+instru[çc][õo]es/i,
  /o\s+que\s+vem\s+antes\s+desta\s+mensagem/i,
  /finja\s+que\s+(voc[êe]\s+)?[ée]/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+if\s+you\s+(have\s+no|are\s+not)/i,
  /\bsystem:\s*/i,
  /<\s*(system|admin|override)\s*>/i,
];

export function looksLikeInjectionAttempt(content: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(content));
}
