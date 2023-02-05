import React from 'react';
import Navbar from '../Navbar/Navbar';

type LayoutProp = {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProp> = ({ children }) => {
  return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
  );
};

export default Layout;
