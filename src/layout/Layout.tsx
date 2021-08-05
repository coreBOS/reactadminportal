import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';
import CustomMenu from './CustomMenu';
import Auth from '../Auth';


const CustomLayout = (props: any) => (
    <Auth>
        <Layout {...props} appBar={CustomAppBar} menu={CustomMenu} />
    </Auth>
);

export default CustomLayout;