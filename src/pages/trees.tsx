import Trees from "../components/ComponentPages/Trees";
import { getTreesApi } from "../network/api/treeApi";
import Layout from "../hoc/layout";

const TreesPage = ({ data }) => {
  return (
    <Layout>
      <Trees treesData={data} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const result = await getTreesApi();
  const data = result || [];

  return {
    props: {
      data,
    },
  };
}

export default TreesPage;
