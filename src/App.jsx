import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader.jsx';


const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Catalog = lazy(() => import('./pages/Catalog/Catalog.jsx'));
const VehicleDetailsPage = lazy(() =>
  import('./pages/VehicleDetailsPage/VehicleDetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);
const VehicleFeatures = lazy(() =>
  import('./components/VehicleFeatures/VehicleFeatures.jsx')
);
const VehicleReviews = lazy(() =>
  import('./components/VehicleReviews/VehicleReviews.jsx')
);

function App() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader type="page loader" />}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<VehicleDetailsPage />}>
              <Route path="features" element={<VehicleFeatures />} />
              <Route path="reviews" element={<VehicleReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
