import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Center from "../components/Center";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import { MdModeEditOutline } from "react-icons/md";
import Button from "../components/Button";

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
  display: flex;
  gap: 20px;
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
  align-items: flex-start;
  // gap: 100px;
  margin: 40px 25px;
  color: #fff;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const EditButton = styled(Button)`
  color: yellow;
  diplay: inline;
`;

const ContentWrapper = styled.div`
  display: 
`;

export default function AccountPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);
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
      .then(async (res) => {
        if (res.data.valid) {
          setUserData({
            firstName: res.data.customer_account_firstName || "",
            lastName: res.data.customer_account_lastName || "",
            email: res.data.customer_account_emailAddress || "",
            username: res.data.customer_account_username || "",
            password: res.data.customer_account_password || "",
            customerReward: res.data.customer_account_reward_id_fk || "",
            customerId: res.data.customer_account_id || "",
          });

          const rewardDetailsResponse = await axios.get(
            `http://localhost:8082/rewards/${res.data.customer_account_reward_id_fk}`
          );
          if (rewardDetailsResponse.data) {
            setUserData((prevData) => ({
              ...prevData,
              customerRewardDetails: rewardDetailsResponse.data,
            }));
          }
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const requestData = {
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        email: userData.email || null,
        username: userData.username || null,
        password: userData.password || null,
        customerId: userData.customerId || null,
      };
      console.log("Request Data:", requestData);

      await axios.put("http://localhost:8082/account", requestData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
                      : "transparent",
                  }}
                >
                  PERSONAL INFO
                </NavLink>

                <NavLink
                  checkout
                  to="/account/myorders"
                  style={{
                    color: isCurrentPage("/account/myorders"),
                    borderColor: isCurrentPage("/account/myorders")
                      ? "#EA33F3"
                      : "transparent",
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
                      : "transparent",
                  }}
                >
                  LOG OUT
                </NavLink>
              </LeftLinks>
            </StyledNav>
          </Wrapper>
        </StyledHeader>
        <PageWrapper>
          <ColumnsWrapper>
            
              <Title>
                My Profile{" "}
                <EditButton primary block onClick={handleEdit}>
                  <MdModeEditOutline />
                </EditButton>
              </Title>
              {editMode ? (
                <PageWrapper>
                  <ColumnsWrapper>
                    <ContentWrapper>
                      <label>First Name:</label>
                      <input
                        type="text"
                        value={userData.firstName}
                        onChange={(e) =>
                          setUserData((prevData) => ({
                            ...prevData,
                            firstName: e.target.value,
                          }))
                        }
                      />
                    </ContentWrapper>

                    <ContentWrapper>
                      <label>Last Name:</label>
                      <input
                        type="text"
                        value={userData.lastName}
                        onChange={(e) =>
                          setUserData((prevData) => ({
                            ...prevData,
                            lastName: e.target.value,
                          }))
                        }
                      />
                    </ContentWrapper>

                    <ContentWrapper>
                      <label>Email:</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }))
                        }
                      />
                    </ContentWrapper>

                    <ContentWrapper>
                      <label>Username:</label>
                      <input
                        type="text"
                        value={userData.username}
                        onChange={(e) =>
                          setUserData((prevData) => ({
                            ...prevData,
                            username: e.target.value,
                          }))
                        }
                      />
                    </ContentWrapper>

                    <ContentWrapper>
                      <label>Password:</label>
                      <input
                        type="password"
                        value={userData.password}
                        onChange={(e) =>
                          setUserData((prevData) => ({
                            ...prevData,
                            password: e.target.value,
                          }))
                        }
                      />
                    </ContentWrapper>
                  </ColumnsWrapper>

                  <button onClick={handleSave}>Save Changes</button>
                </PageWrapper>
              ) : (
                <>
                  <ContentWrapper>
                    <P> First Name:</P>
                    <Output>{userData.firstName}</Output>
                  </ContentWrapper>

                  <ContentWrapper>
                    <P> Last Name:</P>
                    <Output>{userData.lastName}</Output>
                  </ContentWrapper>

                  <ContentWrapper>
                    <P> Email:</P>
                    <Output>{userData.email}</Output>
                  </ContentWrapper>

                  <ContentWrapper>
                    <P> Username:</P>
                    <Output>{userData.username}</Output>
                  </ContentWrapper>

                  <ContentWrapper>
                    <P> Password:</P>
                    <Output> {userData.password.replace(/./g, "*")} </Output>
                  </ContentWrapper>
                </>
              )}
           

            <ContentWrapper>
              <Title>Rewards</Title>
              <ColumnsWrapper>
                <ContentWrapper>
                  <Output>
                    {userData.customerRewardDetails ? (
                      <>
                        <p>
                          Name:{" "}
                          {userData.customerRewardDetails.customer_reward_name}
                        </p>
                        <p>
                          Code:{" "}
                          {userData.customerRewardDetails.customer_reward_code}
                        </p>
                        <p>
                          Percentage:{" "}
                          {
                            userData.customerRewardDetails
                              .customer_reward_percentage
                          }
                        </p>
                      </>
                    ) : (
                      "No rewards yet"
                    )}
                  </Output>
                </ContentWrapper>
              </ColumnsWrapper>
            </ContentWrapper>
          </ColumnsWrapper>
        </PageWrapper>
      </Center>
    </>
  );
}
