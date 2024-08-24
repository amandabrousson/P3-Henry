import React, { Suspense } from 'react';

const LazyLoading = React.lazy(() => import('../LazyLoading'));

const Perfil = () => {
    return (
        <Suspense fallback={<p>Cargando perfil...</p>}>
            <LazyLoading />
        </Suspense>
    );
};

export default Perfil;
