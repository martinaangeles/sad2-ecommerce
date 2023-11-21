import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Center from "../components/Center";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";

const sharedTitleStyles = `
  font-size: 1.5em;
  color: #fff;
  text-align: left; 
  margin-right: 20px;
  font-weight: bold; 
  cursor: pointer;
`;

const Title = styled.h1`
  ${sharedTitleStyles}
`;

const StyledHeader = styled.header`
  background-color: #000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const NavLink = styled(ButtonLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: border 0.3s;
  font-size: medium;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

const LeftLinks = styled.div`
  display: flex;
  gap: 40px;
`;
const P = styled.p`
  font-size: small;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  display: inline;
  margin-right: 20px;
`;

const Output = styled.p`
  font-size: small;
  color: white;
  font-weight: light;
  text-transform: uppercase;
  display: inline;
  
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 500px;
  margin: 40px 25px;
  color: #fff;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

export default function AccountPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const location = useLocation();
  const isCurrentPage = (path) => location.pathname === path;
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:8082/logout")
      .then((res) => {
        if (res.data.loggedOut) {
          setUserData({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
          });
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/account")
      .then((res) => {
        if (res.data.valid) {
          setUserData({
            firstName: res.data.customer_account_firstName || "",
            lastName: res.data.customer_account_lastName || "",
            email: res.data.customer_account_emailAddress || "",
            username: res.data.customer_account_username || "",
            password: res.data.customer_account_password || "",
          });
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <>
      <Center>
        <StyledHeader>
          <Wrapper>
            <StyledNav>
              <LeftLinks>
                <NavLink
                  checkout
                  to="/account"
                  style={{
                    color: isCurrentPage("/account"),
                    borderColor: isCurrentPage("/account")
                      ? "#EA33F3"
                      : "transparent", // Neon pink border for the current page
                  }}
                >
                  PERSONAL INFO
                </NavLink>

                <NavLink
                  checkout
                  to="/myorders"
                  style={{
                    color: isCurrentPage("/myorders"),
                    borderColor: isCurrentPage("/myorders")
                      ? "#EA33F3"
                      : "transparent", // Neon pink border for the current page
                  }}
                >
                  MY ORDERS
                </NavLink>

                <NavLink
                  checkout
                  onClick={handleLogout}
                  style={{
                    color: isCurrentPage("/logout"),
                    borderColor: isCurrentPage("/logout")
                      ? "#EA33F3"
                      : "transparent", // Neon pink border for the current page
                  }}
                >
                  LOG OUT
                </NavLink>
              </LeftLinks>
            </StyledNav>
          </Wrapper>
        </StyledHeader>
        <PageWrapper>
          <Title> My Profile </Title>
        </PageWrapper>

        <PageWrapper>
          <ColumnsWrapper>
            <ContentWrapper>
              <P> First Name:</P>
              <Output>{userData.firstName}</Output>
            </ContentWrapper>
            <ContentWrapper>
              <P> Last Name:</P>
              <Output>{userData.lastName}</Output>
            </ContentWrapper>
            <ContentWrapper>
              <P> Contact Number: </P>
            </ContentWrapper>
            <ContentWrapper>
              <P> Email: </P>
              <Output> {userData.email} </Output>
            </ContentWrapper>
          </ColumnsWrapper>
          <ColumnsWrapper>
            <P> Username:</P> <Output> {userData.username} </Output>
            <P> Password:</P> <Output> ******* </Output>
          </ColumnsWrapper>
        </PageWrapper>
      </Center>
    </>
  );
}
