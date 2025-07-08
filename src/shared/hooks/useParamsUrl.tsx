import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useParamsUrl = () => {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setParams = (newParams: { [key: string]: string | number | undefined }) => {
        if (!searchParams?.entries()) return;
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        Object.entries(newParams).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value.toString());
            }
        });

        const search = params.toString();
        const query = search ? `?${search}` : '';

        router.push(`${pathname}${query}`, { scroll: false });
        // ** Shallow Routing ** //
        // window.history.pushState(null, "", query)
    };

    return { searchParams, setParams };
};
