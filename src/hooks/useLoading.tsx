import { useState } from 'react';

function useLoading() {
    const [loading, setLoading] = useState<boolean>(false);

    return {
        loading, setLoading
    };
}

export default useLoading;
