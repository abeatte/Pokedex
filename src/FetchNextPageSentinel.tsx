import type { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

function FetchNextPageSentinel(
    { fetchParams }: { fetchParams: Pick<InfiniteQueryObserverBaseResult, 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage'> }
) {
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = fetchParams;
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage, hasNextPage]);

    return (<div ref={ref} ></div>);
}

export default FetchNextPageSentinel;