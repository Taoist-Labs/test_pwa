import { useEffect } from "react";
import PubSub from "pubsub-js";

export default function useSubcribe(event, callback) {

    useEffect(() => {
        event && PubSub.unsubscribe(event);
        PubSub.subscribe(event, callback);
    }, [event, callback]);

    useEffect(() => {
        return () => {
            PubSub.unsubscribe(event);
        };
    }, [])
}