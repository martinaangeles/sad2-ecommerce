import Featured from "../components/Featured";
import NewProducts from "../components/NewProducts";
import styled from "styled-components";

const BG = styled.div`
  margin-bottom: 100px;
`;

export default function Home({ featuredProduct, newProducts }) {
 
  return (
   
    <BG>
      <Featured featuredProduct={featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </BG>
   
  );
}


