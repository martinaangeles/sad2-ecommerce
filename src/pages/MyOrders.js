import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Center from "../components/Center";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";



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

export default function MyOrders() {
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
  return (
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
                  onClick={handleLogout}
                  checkout
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
    </Center>
  )
}
