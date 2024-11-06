import './App.css';
import Layout from '../src/layout';
import AddressPage from './pages/address';
import RouterComponent from './routers';

function App() {
  return (
    <Layout>
      <RouterComponent>
        <AddressPage/>
      </RouterComponent>
    </Layout>
  );
}

export default App;
