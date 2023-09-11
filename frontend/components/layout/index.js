import { useRouter } from 'next/router';
import React from 'react';
import DefaultLayout from './Default';
import MainLayout from './Main';

 const Layout = ({children}) => {
  const { pathname } = useRouter();

  return (
    <>
      {pathname.includes("login") ? (
        <DefaultLayout> {children} </DefaultLayout>
      ) : (
        <MainLayout> {children} </MainLayout>
      )}
    </>
  );
 }

 export default Layout