export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex min-h-screen w-full md:w-[40vw] flex-col m-auto p-10">{children}</main>;
}
