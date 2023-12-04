"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import queryString from "query-string";
import { formatISO } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { CountrySelectValue } from "../inputs/CountrySelect";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams;
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    //here we'll rerender the Map every time location value change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setStep((currentValue) => currentValue - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((currentValue) => currentValue + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      //we've to transform date into string by formtISO for the url
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    router,
    params,
    dateRange,
    onNext,
    location,
    guestCount,
    roomCount,
    bathroomCount,
  ]);

  return (
    <Modal
      title="Filters"
      actionLabel="Search"
      isOpen={searchModal.isOpen}
      onSubmit={searchModal.onOpen}
      onClose={searchModal.onClose}
    ></Modal>
  );
};

export default SearchModal;
