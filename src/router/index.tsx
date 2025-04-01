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
    SingleMaqola,
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
                <Route path="maqolalar/:id" element={<SingleMaqola />} />
                <Route path="nizom" element={<Nizom />} />
                <Route path="faq/:category?" element={<Savollar />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Index;
