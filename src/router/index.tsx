import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from '../App.tsx';
import {
    Home,
    Boglanish,
    Savollar,
    Sovrin,
    Maqolalar,
    Nizom,
   
} from '@modules';

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="sovrin" element={<Sovrin />} />
                <Route path="savollar" element={<Savollar />} />
                <Route path="boglanish" element={<Boglanish />} />
                <Route path="maqolalar" element={<Maqolalar />} />
                <Route path="nizom" element={<Nizom />} />
                {/* FAQ Sahifasi va Dinamik Routing */}
                <Route path="faq/:category?" element={<Savollar />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Index;
