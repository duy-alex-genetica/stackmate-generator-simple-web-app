import { useRouter } from "next/router";
import { useEffect } from "react";

const useConfirmLeaving = ({ validator, message }: {
  validator: () => boolean
  message?: string
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!validator()) return;

      const shouldLeave = window.confirm(message ?? "You have unsaved changes. Are you sure you want to leave?");

      if (!shouldLeave) {
        router.events.emit("routeChangeError");
        throw "Route change aborted";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, validator]);
};

export default useConfirmLeaving;
