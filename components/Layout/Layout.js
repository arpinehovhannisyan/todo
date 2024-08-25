import Footer from "./Footer";
import Header from "./Header";
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { putRequest } from "@/api";

const Layout = ({ children }) => {
  const { mutate } = useMutation({
    mutationFn: () => {
      const refreshToken = getCookie("refreshToken")
      const userId = getCookie("userId")
      if (refreshToken && userId) {
        return putRequest({ url: `/user/${userId}/token`, body: { refreshToken } })
      }
    },
    onSuccess: (data) => {
      console.log(data)
      setCookie("token", data.jwt);
      setCookie("refreshToken", data.refreshToken);
    }
  })
  useEffect(() => {
    setInterval(mutate, 1 * 60000);
  }, [mutate])
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>)
}
export default Layout;