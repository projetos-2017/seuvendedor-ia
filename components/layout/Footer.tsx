export function Footer() {
  return (
    <footer className="border-t border-ink-800 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Seu Vendedor IA. Todos os direitos reservados.</p>
        <p className="text-ink-500">seuvendedorai.com.br</p>
      </div>
    </footer>
  );
}
