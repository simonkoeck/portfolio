import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { COOKIE_CONSENT } from "../constants/storage";
import CustomLink from "./Link";

type Props = {
  onCookieConsentAccepted: () => void;
};

export default function CookieConsent({ onCookieConsentAccepted }: Props) {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        if (
          localStorage.getItem(COOKIE_CONSENT) != "accepted" &&
          localStorage.getItem(COOKIE_CONSENT) != "declined"
        ) {
          setShow(true);
        }
      }, 2000);
    }
  }, []);

  function accepted() {
    localStorage.setItem(COOKIE_CONSENT, "accepted");
    setShow(false);
    onCookieConsentAccepted();
  }
  function declined() {
    localStorage.setItem(COOKIE_CONSENT, "declined");
    setShow(false);
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed bottom-0 left-0 w-screen z-[80] bg-background px-3 sm:px-20 py-4"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row flex-wrap items-center justify-between ">
              <div className="text-sm">
                <span className="text-gray-300">
                  This website uses cookies to improve user experience. By using
                  our website you consent to all cookies in accordance with our
                  Cookie Policy.{" "}
                </span>
                <CustomLink href="/cookies">Read more</CustomLink>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  className="px-3 py-2 text-sm font-semibold rounded-md bg-fuchsia-500"
                  onClick={() => {
                    accepted();
                  }}
                >
                  Accept all
                </button>
                <button
                  className="px-3 py-2 ml-3 text-sm font-semibold text-gray-300 bg-gray-600 rounded-md"
                  onClick={() => {
                    declined();
                  }}
                >
                  Decline all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
