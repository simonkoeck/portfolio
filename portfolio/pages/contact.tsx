import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import HomeLayout from "../components/layouts/HomeLayout";
import "react-quill/dist/quill.snow.css";
import Script from "next/script";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  HiCheck,
  HiExclamationCircle,
  HiInformationCircle,
} from "react-icons/hi";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Link from "../components/Link";
import CustomHead from "../components/Head";
import csrf from "../services/csrf";

type Props = {
  countryName?: string;
  countryCode?: string;
  regionName?: string;
  ip?: string;
  csrfToken: string;
};

export default function Contact({
  countryCode,
  regionName,
  countryName,
  ip,
  csrfToken,
}: Props) {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [hcaptchaToken, setHcaptchaToken] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [autofilledCountry, setAutofilledCountry] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countryName != null) {
      setCountry(countryName);
      setAutofilledCountry(true);
    }
  }, [countryCode]);

  function hcaptchaTokenVerified(token: string) {
    console.log(token);
    setHcaptchaToken(token);
  }

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validateFields(): boolean {
    let errors: any = {};
    if (firstname == "") {
      errors = {
        ...errors,
        firstname: "Please enter your first name",
      };
    }
    if (lastname == "") {
      errors = {
        ...errors,
        lastname: "Please enter your last name",
      };
    }
    if (email == "") {
      errors = {
        ...errors,
        email: "Please enter your email",
      };
    }
    if (message == "") {
      errors = {
        ...errors,
        message: "Please enter your message",
      };
    }
    if (validateEmail(email) == null) {
      errors = {
        ...errors,
        email: "Please enter a valid email",
      };
    }
    if (hcaptchaToken == "") {
      errors = {
        ...errors,
        hcaptcha: "Please verify that you are not a robot",
      };
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length == 0) {
      return true;
    }
    return false;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateFields();
    if (v == true) {
      // Send to server
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const r = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            subject,
            message,
            hCaptchaToken: hcaptchaToken,
            phone,
            country,
            region,
          }),
        });
        console.log(r);
        setLoading(false);
        if (r.status != 200) {
          setError("Something went wrong. Please try again later.");
        } else {
          setSuccess(true);
        }
      } catch (e) {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <>
      <CustomHead
        description="Contact me over this form or via email (simon@koeck.dev). I will get back to you as soon as possible. If you have any questions, feel free to contact me."
        title="Simon Köck | Contact"
      />
      <HomeLayout>
        <div className="container px-4 pt-12 pb-20 mx-auto">
          <h1 className="text-4xl font-black">Contact</h1>
          {success && (
            <div>
              <div className="inline-block px-4 py-2 mt-4 font-bold text-green-500 bg-green-200 border-2 border-green-500 rounded-md">
                Your contact request was sent successfully. I will get back to
                you as soon as possible.
              </div>
            </div>
          )}
          {error && (
            <div className="inline-block px-4 py-2 mt-4 font-bold text-red-500 bg-red-200 border-2 border-red-500 rounded-md">
              {error}
            </div>
          )}

          <form
            className="relative"
            method="POST"
            action="/"
            onSubmit={onSubmit}
          >
            {success && (
              <div className="absolute inset-0 z-40 w-full h-full"></div>
            )}
            <div className="w-full md:w-1/2">
              <div className="flex flex-row mt-4 space-x-4">
                <InputField
                  required
                  label="First Name"
                  type="text"
                  onChange={(v) => setFirstname(v)}
                  error={fieldErrors.firstname}
                  placeholder="John"
                />
                <InputField
                  required
                  label="Last Name"
                  type="text"
                  onChange={(v) => setLastname(v)}
                  error={fieldErrors.lastname}
                  placeholder="Johnson"
                />
              </div>
              <div className="flex flex-row space-x-4">
                <InputField
                  required
                  label="E-Mail"
                  type="email"
                  onChange={(v) => setEmail(v)}
                  error={fieldErrors.email}
                  placeholder="john@johnson.dev"
                />
                <InputField
                  label="Phone"
                  type="tel"
                  onChange={(v) => setPhone(v)}
                  placeholder="+1 (123) 456-7890"
                  error={fieldErrors.phone}
                />
              </div>
              <div className="relative flex flex-row w-full space-x-4">
                <div className="flex-1 w-full">
                  <label className="text-gray-200">Country</label>
                  <CountryDropdown
                    classes="text-sm w-full px-2 py-2 bg-background2 outline outline-[1.5px] outline-gray-600 rounded-md my-2"
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                      setAutofilledCountry(false);
                    }}
                  />
                  {autofilledCountry && (
                    <div className="flex flex-row items-center mb-1 space-x-2">
                      <HiInformationCircle className="fill-gray-500 text-[1rem]" />
                      <span className="text-[0.74rem] text-gray-500">
                        We autofilled your country based on your current IP
                        address ({ip})
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <label className="text-gray-200">Region</label>
                  <RegionDropdown
                    classes="text-sm flex-1 w-full px-2 py-2 bg-background2 outline outline-[1.5px] outline-gray-600 rounded-md my-2"
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)}
                  />
                </div>
              </div>

              <InputField
                label="Subject"
                type="text"
                placeholder="e.g. Website Feedback"
                onChange={(v) => setSubject(v)}
                error={fieldErrors.subject}
              />
              <InputField
                required
                label="Message"
                type="rich-text"
                onChange={(v) => setMessage(v)}
                error={fieldErrors.message}
              />

              {!success && (
                <>
                  <div className="my-6">
                    <HCaptcha
                      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                      theme="dark"
                      languageOverride="en"
                      onVerify={hcaptchaTokenVerified}
                    />
                    {fieldErrors.hcaptcha != null && (
                      <div className="flex flex-row items-center mt-2 space-x-2 text-sm">
                        <HiExclamationCircle className="text-xl fill-red-500" />
                        <div className="font-bold text-red-500">
                          {fieldErrors.hcaptcha}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center w-full px-3 py-2 space-x-2 font-bold border-2 rounded-md cursor-pointer sm:space-x-3 sm:px-5 sm:py-1 text-md md:text-lg border-grey-400"
                  >
                    {!loading && <HiCheck className="text-2xl fill-grey-400" />}
                    <span className="text-grey-400">
                      {loading ? "..." : "Submit Form"}
                    </span>
                  </button>
                </>
              )}
            </div>
            <div className="mt-3 text-sm">
              <span className="text-gray-400">
                I care about the protection of your data. Read my{" "}
              </span>
              <Link href="/privacy">Privacy Policy</Link>{" "}
            </div>
          </form>
          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center w-full my-10 space-x-4">
              <div className="w-full h-[1px] bg-gray-600"></div>
              <span className="font-bold text-gray-500">or</span>
              <div className="w-full h-[1px] bg-gray-600"></div>
            </div>
            <p>
              <span className="text-gray-400">Contact me over email at </span>
              <Link href="mailto:simon@koeck.dev">simon@koeck.dev</Link>
            </p>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

interface ISSRProps {
  req: any;
  res: any;
}

export const getServerSideProps = async ({ req, res }: ISSRProps) => {
  const forwarded = req.headers["x-forwarded-for"];

  let ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;

  if (process.env.NODE_ENV == "development") ip = "81.5.250.145";

  const r = await fetch(`http://ip-api.com/json/${ip}`);
  if (r.status != 200) {
    await csrf(req, res);
    return {
      props: { csrfToken: req.csrfToken() },
    };
  }
  const j = await r.json();
  await csrf(req, res);

  return {
    props: {
      ip,
      countryCode: j.countryCode,
      regionName: j.regionName,
      countryName: j.country,
      csrfToken: req.csrfToken(),
    },
  };
};
