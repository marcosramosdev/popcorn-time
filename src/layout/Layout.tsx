type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div>
      <header>
        <h1>Popcorn time</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
