import Link from 'next/link'; // https://nextjs.org/docs/api-reference/next/link
import styled from 'styled-components';

import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: red;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

function OldHeader() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick fits</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
      <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}

function Header() {
  return (
    <header className="mb-8">
      <div className="p-6 border-b-8 border-black flex flex-col items-center xl:flex-row">
        <h1 className="bg-primary text-white inline-block p-2 uppercase text-4.5xl transform -skew-x-7">
          <Link href="/">Sick fits</Link>
        </h1>
        <Nav />
      </div>
      <div className="sub-bar">
      <Search />
      </div>
      <Cart />
    </header>
  );
}

export default Header;