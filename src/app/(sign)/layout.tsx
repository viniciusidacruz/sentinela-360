export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="flex-1/4 h-full flex items-center justify-center px-8">
        {children}
      </section>

      <section className="flex-1 h-full bg-blue-500 md:flex justify-center p-2 flex-col gap-2 hidden">
        <h2 className="text-white text-base font-bold">
          Entre e navega através dos feedbacks do seu cliente
        </h2>

        <p className="text-white text-sm">
          Acompanhe todas as reclamações e avaliações sobre sua empresa em tempo
          real!.
        </p>
      </section>
    </main>
  );
}
